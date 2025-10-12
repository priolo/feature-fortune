import CommentDialog from '@/components/CommentDialog';
import featureDetailSo from '@/stores/feature/detail';
import { Comment } from '@/types/Comment';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useState } from 'react';



interface Props {
}

const CommentsCard: React.FC<Props> = ({
}) => {

	// STORES
	useStore(featureDetailSo)


	// HOOKS
	const [dialogCommentOpen, setDialogCommentOpen] = useState(false);

	
	// HANDLERS
	const handleCommentClick = () => {
		setDialogCommentOpen(true)
	};
	const handleCommentDialogClose = (comment: Comment) => {
		setDialogCommentOpen(false)
		if (!comment) return
		featureDetailSo.addComment(comment)
	}


	// RENDER
	const comments = featureDetailSo.state.feature?.comments ?? [];
	const haveComments = comments != null && comments.length > 0;

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

				{haveComments ? (
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
			isOpen={dialogCommentOpen}
			onClose={handleCommentDialogClose}
		/>

	</>
}

export default CommentsCard;
