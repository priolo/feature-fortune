import React from 'react';
import { Typography, SxProps, Box } from '@mui/material';
import { Done, InfoOutline, WarningAmber, ErrorOutline } from '@mui/icons-material';

export type MessageVariant = 'info' | 'warn' | 'error' | 'done';

interface MessageCmpProps {
	variant: MessageVariant;
	title: React.ReactNode;
	children?: React.ReactNode;
	sx?: SxProps;
}

const MessageCmp: React.FC<MessageCmpProps> = ({ 
	variant, 
	title, 
	children,
	sx
}) => {
	let Icon = InfoOutline;
	let color: "success" | "warning" | "error" | "info" = "info";

	switch (variant) {
		case 'done':
			Icon = Done;
			color = "success";
			break;
		case 'warn':
			Icon = WarningAmber;
			color = "warning";
			break;
		case 'error':
			Icon = ErrorOutline;
			color = "error";
			break;
		case 'info':
		default:
			Icon = InfoOutline;
			color = "info";
			break;
	}

	return (
		<Typography component="div" sx={sx}>
			<Icon color={color} sx={sxIcon} />
			{title}
			<Box component="span" sx={{ color: 'text.secondary' }}>
				{children}
			</Box>
		</Typography>
	);
};

const sxIcon: SxProps = {
	fontSize: '1.4em',
	verticalAlign: 'text-bottom',
	ml: "2px",
	mr: "6px",
};

export default MessageCmp;
