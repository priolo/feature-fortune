import { ArrowBack, NavigateBefore } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';


interface Props {
	toHome?: boolean
}
const BackButton: React.FC<Props> = ({
	toHome = false,
}) => {

	// STORES
	
	// HOOKS
	const navigate = useNavigate()

	// HANDLERS
	const handleGoBack = () => {
		if ( toHome ) {
			navigate('/app');
		} else if (window.history.length > 2) {
			navigate(-1);
		} else {
			navigate('/app');
		}
	}

	// RENDER
	return (
		<IconButton
			onClick={handleGoBack}
		><NavigateBefore /> </IconButton>
	)
}

export default BackButton;
