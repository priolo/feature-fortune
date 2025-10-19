import CommentDialog from '@/components/comment/CommentDialog';
import commentListSo from '@/stores/comment/list';
import { Comment } from '@/types/Comment';
import { Box, Button, CardContent, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import Card from '../Card';
import { CommentBank } from '@mui/icons-material';
import CommentsList from './MessagesList';



interface Props {
	featureId?: string
}

const CommentsCard: React.FC<Props> = ({
	featureId
}) => {

	// STORES
	useStore(commentListSo)


	// HOOKS
	const [dialogOpen, setDialogOpen] = useState(false)
	useEffect(() => {
		if (!featureId) {
			commentListSo.setAll(null)
			return
		}
		commentListSo.fetch({ featureId })
	}, [featureId])


	// HANDLERS
	const handleCommentClick = () => {
		setDialogOpen(true)
	};
	const handleCommentDialogClose = (comment: Comment) => {
		setDialogOpen(false)
		if (!comment) return
		comment.entityType = 'feature'
		comment.entityId = featureId
		commentListSo.setSelected(comment)
		commentListSo.saveSelected()
	}


	// RENDER
	const comments = commentListSo.state.all
	if (!comments) return null
	const isVoid = comments.length == 0;

	return <>
		<Card id="comment-list-card"
			title="Comments"
			icon={<CommentBank color="primary" />}
			titleEndRender={
				<Button variant='contained' size="small" 
					onClick={handleCommentClick}
				>ADD COMMENT</Button>
			}
		>

			{!isVoid ? (
				<CommentsList
					comments={comments}
					onClick={(comment) => console.log('Comment clicked:', comment)}
				/>
			) : (
				<Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
					No comments yet for this feature.
				</Typography>
			)}

		</Card>

		<CommentDialog
			isOpen={dialogOpen}
			onClose={handleCommentDialogClose}
		/>

	</>
}

export default CommentsCard;
