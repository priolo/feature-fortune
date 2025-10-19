import { Comment } from '@/types/Comment';
import { Box, Paper, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import AvatarCmp from '../AvatarCmp';



interface Props {
	comment: Comment;
	onClick?: (comment: Comment) => void;
}

const CommentRow: React.FC<Props> = ({
	comment,
	onClick
}) => {

	// RENDER
	const dateStr = dayjs(comment.createdAt).format('MMM D, YYYY h:mm A');

	return (<Box sx={sxRow}>
		<Box
			sx={sxAvatarRow}
			onClick={() => onClick?.(comment)}
		>
			<AvatarCmp account={comment.account} />

			<Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: 'hidden', gap: .5 }} >

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ flex: 1 }}>
						{comment.account?.name ?? "Unknown Account"}
					</Typography>

					<Typography variant='overline' color="textSecondary">
						{dateStr}
					</Typography>

				</Box>

				<Typography variant='body2' color="textSecondary" sx={{ overflowWrap: 'break-word' }}>
					{"comment.title"}
				</Typography>

			</Box>

		</Box>

		<Typography>
			{comment.text}
		</Typography>

	</Box>);
};

export default CommentRow;

const sxRow:SxProps = {
	display: 'flex', 
	flexDirection: 'column', 
	gap: 1,
	// cursor: onClick ? 'pointer' : 'default',
	// '&:hover': onClick ? {
	//     backgroundColor: 'action.hover'
	// } : {}
}

const sxAvatarRow: SxProps = {
	display: 'flex',
	gap: 1,
	alignItems: 'center',
}
