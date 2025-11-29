import Card from '@/components/Card';
import MessageBanner from '@/components/MessageBanner';
import Framework from '@/layout/Framework';
import authSo from '@/stores/auth';
import featureListSo from '@/stores/feature/list';
import { FEATURE_FILTER, FEATURE_SORT } from "@/stores/feature/types";
import { filterByAccount, filterByStatus, filterByText, sort } from '@/stores/feature/utils';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { Box, List, ListItemButton } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FeatureListOverview from './Overview';
import FeatureView from './FeatureView';
import RightRender from './RightRender';



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


	// RENDER
	return <Framework sx={{ py: 2 }}
		leftRender={<FeatureListOverview />}
		rightRender={<RightRender />}
	>

		<Card>
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