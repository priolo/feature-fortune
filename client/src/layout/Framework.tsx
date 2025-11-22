import { Box, SxProps } from '@mui/material';
import React from 'react';


interface Props {
	children?: React.ReactNode
	sx?: SxProps
	leftRender?: React.ReactNode
	rightRender?: React.ReactNode
}

const Framework: React.FC<Props> = ({
	children,
	sx,
	leftRender,
	rightRender,
}) => {

	// RENDER

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

			<Box sx={sxSide}>
				{leftRender}
			</Box>

			<Box sx={[sxRoot, sx] as SxProps}>
				{children}
			</Box>

			<Box sx={sxSide}>
				{rightRender}
			</Box>

		</Box>
	)
}

export default Framework;

const sxRoot: SxProps = {
	flex: '0 1 800px',
	//width: '100%',
	//marginX: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
	maxWidth: 800,
}

const sxSide: SxProps = {
	flex: 1,
	minWidth: 32,
}