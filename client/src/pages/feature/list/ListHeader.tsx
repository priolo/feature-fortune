import authSo from '@/stores/auth/repo';
import { FEATURE_FILTER, FEATURE_SORT } from "@/stores/feature/types";
import { Add, Close, FindInPage, Search } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FeatureFilterSelector from "./FeatureFilterSelector";
import FeatureSortSelector from "./FeatureSortSelector";



const FeatureListHeader: React.FC = () => {

	// STORES
	useStore(authSo)

	// HOOKS
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams();

	// HANDLERS
	const handleNewFeatureClick = () => {
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
	const handleSearchChange = (search: string) => {
		if (search == null || search.trim() == '') {
			delete params.search
			setSearchParams(params)
			return
		}
		setSearchParams({ ...params, search })
	}

	// RENDER
	const logged = !!authSo.state.user
	const params = Object.fromEntries(searchParams.entries())
	const filterId = params.filter as FEATURE_FILTER
	const sortId = params.sort as FEATURE_SORT
	const search = params.search as string ?? ''

	return <>
		<Typography variant="h5">
			FEATURES
		</Typography>
		<Box sx={{ flex: 1 }}></Box>

		{logged && <>

			<TextField
				value={search}
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

			<FeatureSortSelector
				sortId={sortId}
				onChange={handleSortChange}
			/>

			<FeatureFilterSelector
				filterId={filterId}
				onChange={handleFilterChange}
			/>

			<Button variant="contained" size="small"
				startIcon={<Add />}
				onClick={handleNewFeatureClick}
			>New Feature</Button>

		</>}
	</>
}

export default FeatureListHeader;
