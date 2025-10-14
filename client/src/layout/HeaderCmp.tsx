import FeatureListHeader from '@/pages/feature/list/ListHeader';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Box, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import UserCmp from './UserCmp';
import FeatureDetailHeader from '@/pages/feature/detail/DetailHeader';
import LoginHeader from '@/pages/login/LoginHeader';
import AccountHeader from '@/pages/account/AccountHeader';



interface HeaderCmpProps {
}

const HeaderCmp: React.FC<HeaderCmpProps> = ({
}) => {

	// STORES
	useStore(locationSo)

	// HOOKS
	const header = useMemo(() => {
		return {
			[LOCATION_PAGE.FeaturesList]: <FeatureListHeader />,
			[LOCATION_PAGE.FeatureDetail]: <FeatureDetailHeader />,
			[LOCATION_PAGE.Login]: <LoginHeader />,
			[LOCATION_PAGE.Account]: <AccountHeader />,
		}[locationSo.state.current]
	}, [locationSo.state.current])

	// RENDER
	return (
		<Box sx={sxRoot}>

			<Box sx={{ flex: 1 }}>
			</Box>

			<Box sx={{ flex: 1, display: "flex", minWidth: "800px", alignItems: "center", gap: 2 }}>
				{header}
			</Box>

			<Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
				<UserCmp />
			</Box>

		</Box>
	);
};

export default HeaderCmp;

const sxRoot: SxProps = {
	backgroundColor: 'white',
	borderBottom: '1px solid #e1e5e9',
	padding: '0 2rem',
	height: '70px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
	flexShrink: 0
}

