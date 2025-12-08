import { Done, Warning } from '@mui/icons-material';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';



export interface PageMenuItem {
	id: string;
	label: string;
	subLabel?: React.ReactNode;
	warnIcon?: boolean
	startRender?: React.ReactNode;
}

interface Props {
	items: PageMenuItem[]
}

const PageMenu: React.FC<Props> = ({
	items,
}) => {

	const handleScroll = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	return (
		<List dense sx={{ ml: 2, mt: -2 }}>
			{items.map((item) => (
				<ListItemButton key={item.id} onClick={() => handleScroll(item.id)}>
					<ListItemText
						primary={item.label}
						secondary={
							<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
								{item.warnIcon == true && <Warning fontSize="inherit" color="primary" />}
								{item.warnIcon == false && <Done fontSize="inherit" color="secondary" />}
								{!!item.startRender && (
									<Box sx={{ minWidth: 13, fontWeight: 600, color: "primary.main" }}>{item.startRender}</Box>
								)}
								{item.subLabel}
							</Box>
						}
					/>
				</ListItemButton>
			))}
		</List>
	);
};

export default PageMenu;
