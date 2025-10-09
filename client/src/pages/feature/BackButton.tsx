import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';



const BackButton: React.FC = () => {

	// STORES
	
	// HOOKS
	const navigate = useNavigate()

	// HANDLERS
	const handleGoBack = () => {
		if (window.history.length > 2) {
			navigate(-1);
			return;
		}
		navigate('/app');
	}

	// RENDER
	return (
		<IconButton
			onClick={handleGoBack}
		><ArrowBack /> </IconButton>
	)
}

export default BackButton;
