import { ExpandLess, ExpandMore, InfoOutlined } from '@mui/icons-material';
import { Box, Collapse, IconButton, Paper, PaperProps, SxProps, Typography } from '@mui/material';
import React, { useState } from 'react';



interface CardProps {
	title: string;
	icon?: React.ReactNode;
	collapsible?: boolean;
	defaultExpanded?: boolean;
	children?: React.ReactNode;
	sx?: PaperProps['sx'];
}

const Card: React.FC<CardProps> = ({
	title,
	icon,
	collapsible = false,
	defaultExpanded = true,
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
		<Paper elevation={3} sx={sxPaper}>

			<Box sx={sxTitle}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
					{icon ?? <InfoOutlined fontSize="small" color="primary" />}
					<Typography variant="h6" sx={{mt: "-3px"}}>
						{title}
					</Typography>
				</Box>

				{collapsible && (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<IconButton size="small" onClick={handleToggle}>
							{expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
						</IconButton>
					</Box>
				)}
			</Box>

			<Collapse in={!collapsible || expanded} unmountOnExit={collapsible}>
				<Box sx={[sxContent, sx] as SxProps}>
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
    paddingTop: 1,
}

const sxPaper: SxProps = {
	borderRadius: 3,
	px: 3,
	py: 2,
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
}

const sxTitle: SxProps = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 2,
}

const sxContent: SxProps = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
}