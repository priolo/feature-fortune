import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { Warning } from '@mui/icons-material';

export interface PageMenuItem {
	id: string;
	label: string;
	subLabel?: React.ReactNode;
	warnIcon?: boolean;
	startRender?: React.ReactNode;
}

interface Props {
	items: PageMenuItem[]
	/**
	 * Function to handle scrolling to a specific id.
	 * If not provided, it defaults to `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`.
	 */
	onScrollTo?: (id: string) => void;

}

const PageMenu: React.FC<Props> = ({ items, onScrollTo }) => {

	const handleScroll = (id: string) => {
		if (onScrollTo) {
			onScrollTo(id);
		} else {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	return (
		<Box sx={{ position: 'sticky', top: 0, px: 2 }}>
			<List dense>
				{items.map((item) => (
					<ListItemButton key={item.id} onClick={() => handleScroll(item.id)}>
						<ListItemText
							primary={item.label}
							secondary={
								<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
									{item.warnIcon && <Warning fontSize="inherit" color="primary" />}
									{!!item.startRender && (
										<Box sx={{ minWidth: 13, fontWeight: 600, color: "primary.main"}}>{item.startRender}</Box>
									)}
									{item.subLabel}
								</Box>
							}
						/>
					</ListItemButton>
				))}
			</List>
		</Box>
	);
};

export default PageMenu;
