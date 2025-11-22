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

	const style = {
		"done": { Icon: Done, color: "success" },
		"warn": { Icon: WarningAmber, color: "warning" },
		"error": { Icon: ErrorOutline, color: "error" },
		"info": { Icon: InfoOutline, color: "info" },
	}[variant] ?? { Icon: InfoOutline, color: "info" };

	return (
		<Typography component="div" sx={sx}>
			<style.Icon color={style.color as any} sx={sxIcon} />
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
