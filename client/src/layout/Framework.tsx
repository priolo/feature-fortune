import dialogSo from '@/stores/layout/dialogStore';
import { Box, Button, SxProps } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';


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


	// HOOKS
	const { t } = useTranslation()


	// RENDER
	return (
		<Box sx={sxRoot}>

			<Box sx={sxLeft}>
				{leftRender}
				<Box sx={{ flex: 1 }} />
				<Box sx={sxFooter}>
					<Button color="inherit">
						<Box sx={{ fontSize: "12px", fontWeight: 300 }}
							onClick={() => dialogSo.setIsPolicyOpen(true)}
						>PRIVACY POLICY</Box>
					</Button>
				</Box>
			</Box>

			<Box sx={[sxCenter, sx] as SxProps}>
				{children}
			</Box>

			<Box sx={sxRight}>
				{rightRender}
			</Box>

		</Box>
	)
}

export default Framework;

const sxRoot: SxProps = {
	position: 'relative',
	display: 'flex',
	alignItems: "flex-start",

	width: '100%',
	//minHeight: '100%',
}

const sxCenter: SxProps = {
	display: 'flex',
	flexDirection: 'column',
	gap: 2,
	flex: '0 1 800px',
	maxWidth: 800,
}

const sxLeft: SxProps = {
	position: 'sticky',
	top: "20px",
	mt: "20px",

	height: "calc(100vh - 100px)",

	display: "flex",
	flexDirection: "column",
	flex: 1,

	minWidth: 32,
}

const sxRight: SxProps = {
	position: 'sticky',
	top: "20px",
	mt: "20px",

	display: "flex",
	flexDirection: "column",
	flex: 1,

	minWidth: 32,
}

const sxFooter: SxProps = {
	alignSelf: "end",
	p: 4,
}