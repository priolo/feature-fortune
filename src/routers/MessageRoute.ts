import { AccountRepo } from "../repository/Account.js";
import { MessageContentRepo } from "../repository/MessageContent.js";
import { MESSAGE_ROLE, MessageRepo } from "../repository/Message.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";



class MessageRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			name: "messages",
			path: "/messages",
			message_repo: "/typeorm/messages",
			message_content_repo: "/typeorm/messages_content",
			routers: [
				{ path: "/", verb: "get", method: "index" },
				{ path: "/unread-count", verb: "get", method: "getUnreadCount" },
				{ path: "/", verb: "post", method: "save" },
				{ path: "/:id/read", verb: "patch", method: "markAsRead" },
				{ path: "/:id", verb: "delete", method: "delete" },
			]
		}
	}
	declare state: typeof this.stateDefault

	/**
	 * Get all messages for the logged-in user (sent or received)
	 */
	async index(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]

		const { role: roleStr } = req.query as { role?: string }
		const role: MESSAGE_ROLE = Number.parseInt(roleStr) || MESSAGE_ROLE.RECEIVER

		const messages: MessageRepo[] = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: {
				where: {
					role: role,
					accountId: userJwt.id,
				},
				relations: {
					content: {
						account: true,
					},
				},
				select: {
					id: true,
					contentId: true,
					accountId: true,
					role: true,
					isRead: true,
					createdAt: true,
					updatedAt: true,
					content: {
						id: true,
						text: true,
						accountId: true,
						createdAt: true,
						account: { id: true, name: true, avatarUrl: true },
					},
				},
			}
		});

		res.json({ messages });
	}

	/**
	 * Get the number of unread messages for the logged-in user
	 */
	async getUnreadCount(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]

		const [_, count] = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.FIND_AND_COUNT,
			payload: {
				where: {
					role: MESSAGE_ROLE.RECEIVER,
					accountId: userJwt.id,
					isRead: false,
				},
				select: {
					id: true
				}
			}
		});

		res.json({ count });
	}


	/**
	 * Post a new message from logged-in user to a receiver
	 */
	async save(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { text, toAccountId }: { text: string, toAccountId: string } = req.body
		if (!text || !text.trim()) return res.status(400).json({ error: "Message text is required" })
		if (!toAccountId) return res.status(400).json({ error: "'receiverId' data is required" })

		// send message
		const { content, msgReceiver, msgSender } = await this.sendMessage(userJwt.id, toAccountId, text)

		res.json({ content, msgReceiver, msgSender });
	}


	/**
	 * Invia un messaggio.
	 * Se fromAccountId è null allora è un messaggio di sistema
	 */
	async sendMessage(fromAccountId: string, toAccountId: string, text: string) {
		if (!toAccountId || !text) throw new Error("toAccountId, fromAccountId and text are required")

		// Save content
		const content: MessageContentRepo = await new Bus(this, this.state.message_content_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: <MessageContentRepo>{
				text: text,
				accountId: fromAccountId,
			}
		})

		// crerate message for the receiver
		const msgReceiver: MessageRepo = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: {
				contentId: content.id,
				accountId: toAccountId,
				role: MESSAGE_ROLE.RECEIVER,
				isRead: false,
				isArchived: false,
			} as MessageRepo
		})

		// if exist create message for the sender
		let msgSender: MessageRepo = null
		if (!!fromAccountId) {
			msgSender = await new Bus(this, this.state.message_repo).dispatch({
				type: typeorm.Actions.SAVE,
				payload: {
					contentId: content.id,
					accountId: fromAccountId,
					role: MESSAGE_ROLE.SENDER,
					isRead: true,
					isArchived: false,
				} as MessageRepo
			})
		}

		return { content, msgReceiver, msgSender }
	}

	/**
	 * Mark a message as read
	 */
	async markAsRead(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const { id } = req.params

		if (!id) return res.status(400).json({ error: "Message ID is required" })

		// Get the message
		const message: MessageRepo = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: id
		})
		if (!message) return res.status(404).json({ error: "Message not found" })

		// Only the receiver can mark the message as read
		if (message.accountId !== userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to mark this message as read" })
		}

		// Update the message
		const messageUpdated: MessageContentRepo = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: {
				id: message.id,
				isRead: true,
			}
		})

		res.json({ data: "ok" })
	}


	/**
	 * Delete a message
	 */
	async delete(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const { id } = req.params
		if (!id) return res.status(400).json({ error: "Message ID is required" })


		// CHECK Get the message
		const message: MessageRepo = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: id
		})
		if (!message) return res.status(404).json({ error: "Message not found" })
		if (message.accountId !== userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to delete this message" })
		}


		// Delete the message
		await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.DELETE,
			payload: id
		})
		// Check if there are other messages with the same contentId
		const otherMessages: MessageRepo[] = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: {
				where: {
					contentId: message.contentId,
				},
			}
		})
		// If no other messages, delete the content as well
		if (otherMessages.length === 0) {
			await new Bus(this, this.state.message_content_repo).dispatch({
				type: typeorm.Actions.DELETE,
				payload: message.contentId,
			})
		}


		res.json({ success: true })
	}

}

export default MessageRoute
