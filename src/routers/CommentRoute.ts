import { FindManyOptions } from "typeorm";
import { AccountRepo } from "../repository/Account.js";
import { CommentRepo } from "../repository/Comment.js";
import { Bus, httpRouter, typeorm } from "@priolo/julian";
import { Request, Response } from "express";



class CommentRoute extends httpRouter.Service {

	get stateDefault() {
		return {
			...super.stateDefault,
			path: "/comments",
			comment_repo: "/typeorm/comments",
			routers: [
				{ path: "/", verb: "get", method: "index" },
				{ path: "/", verb: "post", method: "save" },
			]
		}
	}
	declare state: typeof this.stateDefault

	async index(req: Request, res: Response) {
		const { featureId } = req.query as { featureId?: string };

		// If no featureId filter is provided, return empty array
		if (!featureId) {
			return res.json({ comments: [] });
		}

		// Get comments filtered by feature ID
		const comments: CommentRepo[] = await new Bus(this, this.state.comment_repo).dispatch({
			type: typeorm.Actions.FIND,
			payload: <FindManyOptions<CommentRepo>>{
				where: {
					entityId: featureId,
					entityType: 'feature'
				},
				relations: {
					account: true
				},
				select: {
					account: {
						id: true,
						name: true,
						avatarUrl: true
					}
				},
				order: { createdAt: 'DESC' }  // Order by creation date, newest first
			}
		});

		res.json({ comments });
	}


	async save(req: Request, res: Response) {
		const userJwt: AccountRepo = req["jwtPayload"]
		let { comment }: { comment: CommentRepo } = req.body
		if (!comment) return res.status(400).json({ error: "Comment data is required" })

		comment.accountId = userJwt.id

		// se è nuovo lo creo
		if (comment.id == null) {
			delete comment.id

			// verifico che lo possa modificare
		} else {
			const commentOld: CommentRepo = await new Bus(this, this.state.comment_repo).dispatch({
				type: typeorm.Actions.GET_BY_ID,
				payload: comment.id
			})
			if (!commentOld) return res.status(404).json({ error: "Feature not found" })
			if (commentOld.accountId !== userJwt.id) return res.status(403).json({ error: "You are not allowed to modify this comment" })
		}

		// salvo
		const commentNew: AccountRepo = await new Bus(this, this.state.comment_repo).dispatch({
			type: typeorm.Actions.SAVE,
			payload: comment
		})

		res.json({ comment: commentNew })
	}

}

export default CommentRoute
