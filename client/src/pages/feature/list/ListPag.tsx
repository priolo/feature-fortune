import Card from '@/components/Card';
import MessageBanner from '@/components/MessageBanner';
import Framework from '@/layout/Framework';
import featureListSo from '@/stores/feature/list';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { List, ListItemButton } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureView from './FeatureView';



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

		<Card id="feature-list-card">
			<List>
				{features.map((feature, index) => (

					<ListItemButton divider={index<features.length-1}  key={feature.id}
						onClick={() => handleFeatureClick(feature.id)}
					>
						<FeatureView sx={{flex: 1, my: 1}} 
							feature={feature} 
						/>
					</ListItemButton>

				))}

				{features.length === 0 && (
					<MessageBanner>
						No features found. Create your first feature to get started!
					</MessageBanner>
				)}
			</List>
		</Card>

	</Framework>
}

export default FeatureListPag;