import { MoreVert as MoreVertIcon, MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { FunctionComponent, useState } from 'react';
//import { useHistory } from 'react-router';

export type ActionMenuProps = {
	label: string
	hidden?: boolean
	color?: any
	icon?: React.ReactNode
	onClick?: (a: ActionMenuProps) => void
	href?: string
}

interface Props {
	actions?: ActionMenuProps[]
	tooltip?: string
	disabled?: boolean
	sx?: any
}

const ActionsMenu: FunctionComponent<Props> = ({
	actions,
	tooltip = "",
	disabled,
	sx,
}) => {

	// HOOKs
	//const history = useHistory()
	const [anchorEl, setAnchorEl] = useState(null)

	// HANDLERs
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		setAnchorEl(e.currentTarget)
	}
	const handleClose = (e: React.MouseEvent) => {
		e.stopPropagation()
		setAnchorEl(null)
	}
	const handleClickAction = (e: React.MouseEvent, action: ActionMenuProps) => {
		e.stopPropagation()
		// if (action.href) {
		// 	history.push(action.href)
		// }
		action.onClick?.(action)
		setAnchorEl(null)
	}

	// RENDER
	if (!actions || actions.length == 0) return null
	return <>
		<Tooltip title={tooltip} placement="top">
			<IconButton sx={sx} size='small'
				disabled={disabled}
				onClick={handleClick}
			><MoreVertIcon /></IconButton>
		</Tooltip>
		<Menu
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
		>{actions.map((action, index) => (
			<ActionMenuItem key={index}
				action={action}
				onClick={handleClickAction}
			/>
		))}
		</Menu>
	</>;
}

export default ActionsMenu


interface ActionMenuItemProps {
	action: ActionMenuProps
	onClick: (e: React.MouseEvent, action: ActionMenuProps) => void
}

const ActionMenuItem: FunctionComponent<ActionMenuItemProps> = ({
	action,
	onClick,
}) => {

	if (action.hidden) return null

	if (action.label == "---") return <Divider />

	return (
		<MenuItem key={action.label}
			onClick={(e) => onClick(e, action)}
		>
			{action.icon && <ListItemIcon>
				{action.icon}
			</ListItemIcon>}
			<Typography variant="caption" color={action.color} textTransform='uppercase'>
				{action.label}
			</Typography>
		</MenuItem>
	)
}