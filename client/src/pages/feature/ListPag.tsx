import Framework from '@/layout/Framework';
import featureListSo from '@/stores/feature/list';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Avatar, Box, Card, CardContent, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const FeatureListPag: React.FC = () => {

	// STORES
	useStore(featureListSo)

	// HOOKS
	const navigate = useNavigate()

	// HOOCKS
	useEffect(() => {
		locationSo.setCurrent(LOCATION_PAGE.FeaturesList)
		featureListSo.fetch()
	}, [])

	// HANDLERS
	const handleFeatureClick = (id: string) => {
		navigate(`/app/feature/${id}`)
	}


	// RENDER

	const features = featureListSo.state.all ?? [];

	return <Framework>

		<Card>
			<CardContent>
				<List>
					{features.map((feature, index) => (

						<ListItemButton divider key={feature.id}
							onClick={() => handleFeatureClick(feature.id)}
						>
							<ListItemAvatar>
								<Avatar sx={{ bgcolor: 'primary.main' }}>
									📦
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
										{feature.title}
									</Typography>
								}
								secondary={
									<Typography variant="body2" color="text.secondary">
										{feature.description}
									</Typography>
								}
							/>
						</ListItemButton>

					))}

					{features.length === 0 && (
						<Box sx={{ textAlign: 'center', py: 4 }}>
							<Typography variant="body1" color="text.secondary">
								No features found. Create your first feature to get started!
							</Typography>
						</Box>
					)}
				</List>
			</CardContent>
		</Card>

	</Framework>
}

export default FeatureListPag;