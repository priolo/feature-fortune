import React, { useState } from 'react';
import { Box, BoxProps, Collapse, IconButton, Paper, PaperProps, SxProps, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, InfoOutlined } from '@mui/icons-material';



interface CardProps {
	title: string;
	icon?: React.ReactNode;
	collapsible?: boolean;
	defaultExpanded?: boolean;
	onToggle?: (expanded: boolean) => void;
	action?: React.ReactNode;
	children?: React.ReactNode;
	sx?: PaperProps['sx'];
	contentProps?: BoxProps;
}

const Card: React.FC<CardProps> = ({
	title,
	icon,
	collapsible = false,
	defaultExpanded = true,
	onToggle,
	action,
	children,
	sx,
	contentProps,
}) => {
	const [expanded, setExpanded] = useState(defaultExpanded);

	const handleToggle = () => {
		if (!collapsible) return;
		setExpanded((prev) => {
			const next = !prev;
			onToggle?.(next);
			return next;
		});
	};

	const { sx: contentSx, ...restContentProps } = contentProps ?? {};

	return (
		<Paper elevation={4} sx={[sxPaper, sx] as SxProps}>

			<Box sx={sxTitle}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
					{icon ?? <InfoOutlined fontSize="small" color="primary" />}
					<Typography variant="h6">
						{title}
					</Typography>
				</Box>

				{collapsible ? (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						{action}
						<IconButton size="small" onClick={handleToggle} aria-label={expanded ? 'Collapse card' : 'Expand card'}>
							{expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
						</IconButton>
					</Box>
				) : (
					action
				)}
			</Box>

			<Collapse in={!collapsible || expanded} unmountOnExit={collapsible}>
				<Box
					sx={[
						{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						},
						...(Array.isArray(contentSx) ? contentSx : contentSx ? [contentSx] : []),
					]}
					{...restContentProps}
				>
					{children}
				</Box>
			</Collapse>
		</Paper>
	);
};

export default Card;

const sxPaper: SxProps = {
	borderRadius: 3,
	px: 3,
	py: 2,
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
}

const sxTitle: SxProps = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 2,
}