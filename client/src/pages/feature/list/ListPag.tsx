import Card from '@/components/Card';
import GithubRepoMetadataViewer from '@/components/github/repos/GithubRepoMetadataViewer';
import MessageBanner from '@/components/MessageBanner';
import Framework from '@/layout/Framework';
import featureListSo from '@/stores/feature/list';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureRow from './FeatureRow';



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

					<ListItemButton divider key={feature.id}
						onClick={() => handleFeatureClick(feature.id)}
					>
						<FeatureRow feature={feature} />
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