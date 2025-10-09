import { Box, SxProps } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderCmp from './HeaderCmp';



const Layout: React.FC = () => {

	// RENDER

	return (
		<Box sx={{
			display: 'flex',
			height: '100vh',
			backgroundColor: '#f5f5f5'
		}}>

			{/* Main Content */}
			<Box sx={sxRoot}>

				{/* Header */}
				<HeaderCmp />

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
	backgroundColor: '#f8f9fa',
}