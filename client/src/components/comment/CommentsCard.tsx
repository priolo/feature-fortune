import CommentDialog from '@/components/comment/CommentDialog';
import commentListSo from '@/stores/comment/list';
import { Comment } from '@/types/Comment';
import { Add, ChatBubble } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../Card';
import MessageBanner from '../MessageBanner';
import CommentsList from './CommentsList';



interface Props {
	featureId?: string
	readonly?: boolean
}

const CommentsCard: React.FC<Props> = ({
	featureId,
	readonly = false,
}) => {


	// STORES
	useStore(commentListSo)


	// HOOKS
	const { t } = useTranslation()
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

		<Card id="comments-card"
			title={t('cards.CommentsCard.title', "COMMENTS")}
			icon={<ChatBubble />}
			titleEndRender={!readonly && (
				<Button variant='contained' size="small"
					startIcon={<Add />}
					onClick={handleCommentClick}
				>{t('cards.CommentsCard.lable.add', "ADD")}</Button>
			)}
		>

			{!isVoid ? (
				<CommentsList
					comments={comments}
				/>
			) : (
				<MessageBanner align="center">
					{t('cards.CommentsCard.empty', "NO COMMENTS YET")}
				</MessageBanner>
			)}

		</Card>

		<CommentDialog
			isOpen={dialogOpen}
			onClose={handleCommentDialogClose}
		/>

	</>
}

export default CommentsCard;
