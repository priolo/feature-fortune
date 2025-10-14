import CommentDialog from '@/components/CommentDialog';
import commentListSo from '@/stores/comment/list';
import featureDetailSo from '@/stores/feature/detail';
import { Comment } from '@/types/Comment';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';



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
		<Card sx={{ width: '100%', mt: 2 }}>
			<CardContent>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
					<Typography variant="h6" component="h2">
						Comments ({comments?.length || 0})
					</Typography>
					<Button variant="contained" color="primary"
						onClick={handleCommentClick}
					>COMMENT</Button>
				</Box>

				{!isVoid ? (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						{comments.map((comment) => (
							<Card key={comment.id} variant="outlined" sx={{ p: 2 }}>
								<Typography variant="body1" sx={{ mb: 1 }}>
									{comment.text}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{new Date(comment.createdAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'short',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit'
									})}
								</Typography>
							</Card>
						))}
					</Box>
				) : (
					<Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
						No comments yet for this feature.
					</Typography>
				)}
			</CardContent>
		</Card>

		<CommentDialog
			isOpen={dialogOpen}
			onClose={handleCommentDialogClose}
		/>

	</>
}

export default CommentsCard;
