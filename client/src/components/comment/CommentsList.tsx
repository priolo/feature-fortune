import { Comment } from '@/types/Comment';
import { Box, Divider } from '@mui/material';
import React from 'react';
import CommentRow from './CommentRow';



interface Props {
	comments: Comment[];
	onClick?: (comment: Comment) => void;
}

const CommentsList: React.FC<Props> = ({ 
	comments, 
	onClick, 
}) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			{comments.map((comment, index) => <React.Fragment key={comment.id}>

				<CommentRow
					comment={comment}
					onClick={onClick}
				/>

				{index < comments.length - 1 && <Divider />}

			</React.Fragment>)}
		</Box>
	);
};

export default CommentsList;
