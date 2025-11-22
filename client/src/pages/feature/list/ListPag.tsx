import Card from '@/components/Card';
import MessageBanner from '@/components/MessageBanner';
import Framework from '@/layout/Framework';
import authSo from '@/stores/auth/repo';
import featureListSo from '@/stores/feature/list';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { FEATURE_FILTER, FEATURE_SORT } from "@/stores/feature/types";
import { filterByAccount, filterByStatus, filterByText, sort } from '@/stores/feature/utils';
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FeatureOverviewSide from './FeatureOverviewSide';
import FeatureView from './FeatureView';



const FeatureListPag: React.FC = () => {

	// STORES
	useStore(featureListSo)

	// HOOKS
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams();

	// HOOCKS
	useEffect(() => {
		locationSo.setCurrent(LOCATION_PAGE.FeaturesList)
		featureListSo.fetch()
	}, [])

	const features = useMemo(() => {
		const params = Object.fromEntries(searchParams.entries())
		let features = featureListSo.state.all ?? []
		features = filterByAccount(features, params.filter as FEATURE_FILTER, authSo.state.user?.id)
		features = filterByStatus(features, params.status as FEATURE_STATUS)
		features = filterByText(features, params.search as string)
		features = sort(features, params.sort as FEATURE_SORT)
		return features
	}, [searchParams, featureListSo.state.all]);

	// HANDLERS
	const handleFeatureClick = (id: string) => {
		navigate(`/app/feature/${id}`)
	}

	const scrollToCard = (cardId: string) => {
		const element = document.getElementById(cardId)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}


	// RENDER
	return <Framework sx={{ py: 2 }}
		leftRender={<FeatureOverviewSide />}
		rightRender={
			<Box sx={{ position: 'sticky', top: 20, pt: 2 }}>
				<List dense>
					<ListItemButton onClick={() => scrollToCard('feature-list-card')}>
						<ListItemText primary="Features" secondary="List of all features" />
					</ListItemButton>
					<ListItemButton onClick={() => navigate('/app/feature/new')}>
						<ListItemText primary="Create New" secondary="Request a new feature" />
					</ListItemButton>
				</List>
			</Box>
		}
	>

		<Card id="feature-list-card" sx={{ mt: 3 }}>
			<List>
				{features.map((feature, index) => (

					<ListItemButton
						divider={index < features.length - 1} key={feature.id}
						onClick={() => handleFeatureClick(feature.id)}
					>
						<FeatureView
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

export default FeatureListPag