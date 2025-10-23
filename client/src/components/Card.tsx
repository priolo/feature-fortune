import { ExpandLess, ExpandMore, InfoOutlined } from '@mui/icons-material';
import { Box, Collapse, IconButton, Paper, PaperProps, SxProps, Typography } from '@mui/material';
import React, { useState } from 'react';



interface CardProps {
	id?: string;
	title?: string;
	icon?: React.ReactNode;
	collapsible?: boolean;
	defaultExpanded?: boolean;
	titleEndRender?: React.ReactNode;
	children?: React.ReactNode;
	sx?: PaperProps['sx'];
}

const Card: React.FC<CardProps> = ({
	id,
	title,
	icon,
	collapsible = false,
	defaultExpanded = true,
	titleEndRender,
	children,
	sx,
}) => {

	// HOOKS
	const [expanded, setExpanded] = useState(defaultExpanded);

	// HANDLERS
	const handleToggle = () => {
		if (!collapsible) return
		setExpanded(!expanded)
	}

	// RENDER
	return (
		<Paper id={id} sx={[sxPaper, sx] as SxProps}>

			{!!title &&
				<Box sx={sxTitleBox}>

					<Box sx={sxTitle}>
						{icon}
						<Typography variant="h6">
							{title}
						</Typography>
					</Box>

					{titleEndRender}

					{collapsible && (
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<IconButton size="small" onClick={handleToggle}>
								{expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
							</IconButton>
						</Box>
					)}
				</Box>
			}

			<Collapse in={!collapsible || expanded} unmountOnExit={collapsible}>
				<Box sx={sxContent}>
					{children}
				</Box>
			</Collapse>

		</Paper>
	)
}

export default Card;

export const sxActionCard: SxProps = {
	display: 'flex',
	justifyContent: 'end',
	gap: 1,
}

const sxPaper: SxProps = {
	borderRadius: 3,
	px: 3,
	py: 2,
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
}

const sxTitleBox: SxProps = {
	position: "sticky",
	top: 0,
	backgroundColor: '#292929',
	zIndex: 1,
	display: 'flex',
	alignItems: 'center',
	gap: 2,
}

const sxTitle: SxProps = {
	flex: 1,
	display: 'flex',
	alignItems: 'center',
	gap: 1.5
}

const sxContent: SxProps = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
}