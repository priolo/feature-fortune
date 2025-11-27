import featureDetailSo from '@/stores/feature/detail';
import fundingListSo from '@/stores/funding/list';
import { sxContent } from '@/theme/AvatarStyle';
import { Comment } from '@/types/Comment';
import { AttachMoney, Build, Person } from '@mui/icons-material';
import { Box, Chip, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
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
	const chips = useMemo(() => {
		const items = [];
		// DEVELOPER
		if (featureDetailSo.state.feature?.accountDevId === comment.accountId) {
			items.push({ label: 'DEVELOPER', color: 'primary', icon: <Build sx={sxIcon} /> });
		}
		// AUTHOR
		if (featureDetailSo.state.feature?.accountId === comment.accountId) {
			items.push({ label: 'AUTHOR', color: 'secondary', icon: <Person sx={sxIcon} /> });
		}
		// FOUNDER
		if (fundingListSo.state.all?.some(f => f.accountId === comment.accountId)) {
			items.push({ label: 'FOUDER', color: 'success', icon: <AttachMoney sx={sxIcon} /> });
		}
		return items;
	}, [comment, featureDetailSo.state.feature, fundingListSo.state.all])

	return (<Box sx={sxRow}>
		<Box
			sx={sxAvatarRow}
			onClick={() => onClick?.(comment)}
		>
			<AvatarCmp account={comment.account} />

			<Box sx={sxContent}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography sx={{ flex: 1 }}>
						{comment.account?.name ?? "Unknown Account"}
					</Typography>

					<Typography variant='overline' color="textSecondary">
						{dateStr}
					</Typography>

				</Box>

				<Box sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
					{chips.map((item, index) => (
						<Chip key={index}
							label={item.label}
							color={item.color}
							icon={item.icon}
						/>
					))}
				</Box>

			</Box>

		</Box>

		<Typography whiteSpace="pre-wrap">
			{comment.text}
		</Typography>

	</Box>);
};

export default CommentRow;

const sxRow: SxProps = {
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

const sxIcon:SxProps = {
	width: "14px",
	height: "14px"
}