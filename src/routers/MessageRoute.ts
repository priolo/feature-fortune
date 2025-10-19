import { AccountRepo } from "../repository/Account.js";
import { MessageRepo } from "../repository/Message.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";



class MessageRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/messages",
			message_repo: "/typeorm/messages",
			routers: [
				{ path: "/", verb: "get", method: "index" },
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

		// Get all messages where the user is either sender or receiver
		const messages: MessageRepo[] = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: {
				where: [
					{ senderId: userJwt.id },
					{ receiverId: userJwt.id }
				],
				order: { createdAt: 'DESC' },  // Order by creation date, newest first
				relations: ['sender', 'receiver']  // Include sender and receiver account details
			}
		});

		res.json({ messages });
	}


	/**
	 * Post a new message from logged-in user to a receiver
	 */
	async save(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { message }: { message: MessageRepo } = req.body
		if (!message) return res.status(400).json({ error: "Message data is required" })

		// Validate required fields
		if (!message.receiverId) return res.status(400).json({ error: "Receiver ID is required" })
		if (!message.text || !message.text.trim()) return res.status(400).json({ error: "Message text is required" })

		// Set the sender as the logged-in user
		message.senderId = userJwt.id
		message.isRead = false

		// For new messages only (no editing)
		delete message.id

		// Save the message
		const messageNew: MessageRepo = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: message
		})

		res.json({ message: messageNew })
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
		if (message.receiverId !== userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to mark this message as read" })
		}

		// Update the message
		message.isRead = true
		const messageUpdated: MessageRepo = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: message
		})

		res.json({ message: messageUpdated })
	}


	/**
	 * Delete a message
	 */
	async delete(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		const { id } = req.params

		if (!id) return res.status(400).json({ error: "Message ID is required" })

		// Get the message
		const message: MessageRepo = await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.GET_BY_ID,
			payload: id
		})

		if (!message) return res.status(404).json({ error: "Message not found" })

		// Only the sender or receiver can delete the message
		if (message.senderId !== userJwt.id && message.receiverId !== userJwt.id) {
			return res.status(403).json({ error: "You are not allowed to delete this message" })
		}

		// Delete the message
		await new Bus(this, this.state.message_repo).dispatch({
			type: typeorm.Actions.DELETE,
			payload: id
		})

		res.json({ success: true })
	}

}

export default MessageRoute
