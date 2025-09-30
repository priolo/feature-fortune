import React from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserCmp from './UserCmp';
import layoutHeaderSo from '@/stores/layout';
import { useStore } from '@priolo/jon';



interface HeaderCmpProps {
}

const HeaderCmp: React.FC<HeaderCmpProps> = ({
}) => {

	// STORES
	useStore(layoutHeaderSo)


	// RENDER

	return (
		<Box component="header" sx={{
			backgroundColor: 'white',
			borderBottom: '1px solid #e1e5e9',
			padding: '0 2rem',
			height: '70px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
			flexShrink: 0
		}}>

			<Box sx={{ flex: 1 }}>
				<Typography variant="h4" component="h1" sx={{
					margin: 0,
					fontSize: '1.5rem',
					color: '#2c3e50',
					fontWeight: 600
				}}>
					Startup Web App
				</Typography>
			</Box>

			<Box sx={{
				flex: 2,
				display: 'flex',
				justifyContent: 'center',
				maxWidth: '500px'
			}}>
				<Box component="form" sx={{
					display: 'flex',
					width: '100%',
					maxWidth: '400px'
				}}>
					<TextField
						type="text"
						placeholder="Search..."
						variant="outlined"
						size="small"
						sx={{
							flex: 1,
							'& .MuiOutlinedInput-root': {
								borderRadius: '25px 0 0 25px',
								'& fieldset': {
									borderColor: '#e1e5e9'
								},
								'&:hover fieldset': {
									borderColor: '#e1e5e9'
								},
								'&.Mui-focused fieldset': {
									borderColor: '#3498db'
								}
							}
						}}
					/>
					<IconButton type="submit" sx={{
						backgroundColor: '#3498db',
						color: 'white',
						borderRadius: '0 25px 25px 0',
						'&:hover': {
							backgroundColor: '#2980b9'
						}
					}}>
						<SearchIcon />
					</IconButton>
				</Box>
			</Box>

			<Box sx={{
				flex: 1,
				display: 'flex',
				justifyContent: 'flex-end'
			}}>
				<UserCmp />
			</Box>

		</Box>
	);
};

export default HeaderCmp;