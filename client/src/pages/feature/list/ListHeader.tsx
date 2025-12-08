import authSo from '@/stores/auth';
import { FEATURE_FILTER, FEATURE_SORT } from "@/stores/feature/types";
import { FEATURE_STATUS } from '@/types/feature/Feature';
import { Add, Close, Search } from '@mui/icons-material';
import { Box, Button, debounce, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FeatureFilterSelector from "./_FeatureFilterSelector";
import FeatureSortSelector from "./_FeatureSortSelector";
import FeatureStatusSelector from "./FeatureStatusSelector";
import featureDetailSo from '@/stores/feature/detail';
import { useTranslation } from 'react-i18next';
import { time } from "@priolo/jon-utils"


const FeatureListHeader: React.FC = () => {

	// STORES
	useStore(authSo)

	// HOOKS
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const params = Object.fromEntries(searchParams.entries())
	const [searchText, setSearchText] = React.useState(() => params.search ?? '')

	// HANDLERS
	const handleNewFeatureClick = () => {
		featureDetailSo.clearEdit()
		navigate('/app/feature/new')
	}
	const handleFilterChange = (filter: FEATURE_FILTER) => {
		if (filter == null) {
			delete params.filter
			setSearchParams(params)
			return
		}
		setSearchParams({ ...params, filter })
	}
	const handleSortChange = (sort: FEATURE_SORT) => {
		if (sort == null) {
			delete params.sort
			setSearchParams(params)
			return
		}
		setSearchParams({ ...params, sort })
	}
	const handleStatusChange = (status: FEATURE_STATUS | null) => {
		if (status == null) {
			delete params.status
			setSearchParams(params)
			return
		}
		setSearchParams({ ...params, status })
	}
	const handleSearchChange = (search: string) => {
		setSearchText(search ?? '')
		if (search == null || search.trim() == '') {
			delete params.search
			setSearchParams(params)
			return
		}
		if (search.length < 3) return
		time.debounce(
			"features_search",
			() => setSearchParams({ ...params, search }),
			500
		)
	}

	// RENDER
	const logged = !!authSo.state.user
	const filterId = params.filter as FEATURE_FILTER
	const sortId = params.sort as FEATURE_SORT
	const statusId = params.status as FEATURE_STATUS


	return <>
		<Typography variant="h5">
			FEATURES
		</Typography>


		{logged && <>

			{/* <FeatureSortSelector
				sortId={sortId}
				onChange={handleSortChange}
			/>

			<FeatureFilterSelector
				filterId={filterId}
				onChange={handleFilterChange}
			/>

			<FeatureStatusSelector
				statusId={statusId}
				onChange={handleStatusChange}
			/> */}

			<TextField sx={{ flex: 1 }}
				value={searchText}
				slotProps={{
					input: {
						startAdornment: <InputAdornment position="start">
							<Search fontSize='small' />
						</InputAdornment>,
						endAdornment: <InputAdornment position="end">
							<IconButton size="small"
								onClick={() => handleSearchChange(null)}
							><Close /></IconButton>
						</InputAdornment>,
					},
				}}
				onChange={(e) => handleSearchChange(e.target.value)}
				placeholder="Search Features..."
			/>


			<Button variant="contained"
				startIcon={<Add />}
				onClick={handleNewFeatureClick}
			>NEW</Button>

		</>}
	</>
}

export default FeatureListHeader;
