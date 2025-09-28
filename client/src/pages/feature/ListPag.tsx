import featureListSo from '@/stores/feature/list';
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Chip,
	ListItemButton
} from '@mui/material';
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
		featureListSo.fetch()
	}, [])

	// HANDLERS
	const handleCreateClick = async () => {
		//await featureListSo.create()
		navigate('/app/feature')
	}


	// RENDER

	const features = featureListSo.state.all ?? [];

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			{/* Page Header */}
			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				mb: 4,
				pb: 2,
				borderBottom: 2,
				borderColor: 'divider'
			}}>
				<Typography variant="h3" component="h1" sx={{
					color: 'text.primary',
					fontWeight: 600
				}}>
					Features
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={handleCreateClick}
					sx={{ textTransform: 'none' }}
				>
					New Feature
				</Button>
			</Box>

			<Card>
				<CardContent>
					<List>
						{features.map((feature, index) => (

							<ListItemButton divider key={feature.id}>
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
		</Container>
	);
};

export default FeatureListPag;