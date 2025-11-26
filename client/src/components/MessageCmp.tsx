import { DoneOutlineRounded, ErrorOutline, InfoOutline, Warning } from '@mui/icons-material';
import { SxProps, Typography } from '@mui/material';
import React from 'react';



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
		"done": { Icon: DoneOutlineRounded, color: "secondary" },
		"warn": { Icon: Warning, color: "primary" },
		"error": { Icon: ErrorOutline, color: "error" },
		"info": { Icon: InfoOutline, color: "info" },
	}[variant] ?? { Icon: InfoOutline, color: "info" };

	return (
		<Typography variant="body1" sx={sx}>
			<style.Icon color={style.color as any} sx={sxIcon} />
			{title}
			<Typography variant='body2' component="span" color='text.secondary'>
				{children}
			</Typography>
		</Typography>
	);
};

const sxIcon: SxProps = {
	fontSize: '1.1em',
	verticalAlign: 'text-bottom',
	ml: "2px",
	mr: "6px",
};

export default MessageCmp;
