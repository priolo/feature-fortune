import { Box, LinearProgress, SxProps } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderCmp from './HeaderCmp';
import layoutSo from '@/stores/layout';
import { useStore } from '@priolo/jon';



const Layout: React.FC = () => {

	// STORE
	useStore(layoutSo);


	// RENDER

	return (
		<Box sx={{
			display: 'flex',
			height: '100vh',
		}}>

			{/* Main Content */}
			<Box sx={sxRoot}>

				{/* Header */}
				<HeaderCmp />

				{layoutSo.state.busy ? <LinearProgress /> : <Box sx={{ mt: "4px" }} />}

				{/* Main Content Area */}
				<Box component="main" sx={sxMain}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default Layout;

const sxRoot: SxProps = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden'
}

const sxMain: SxProps = {
	flex: 1,
	overflowY: 'auto',
}