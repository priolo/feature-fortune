import deviceSo from '@/stores/layout/device';
import dialogSo from '@/stores/layout/dialogStore';
import { Box, Button, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
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

	// STORES
	useStore(deviceSo)

	// HOOKS
	const { t } = useTranslation()


	// RENDER
	const isDesktop = deviceSo.isDesktop()

	return (
		<Box sx={sxRoot}>

			{isDesktop && (
				<Box sx={sxLeft}>
					{leftRender}
					<Box sx={{ flex: 1 }} />
					<Box sx={sxFooter}>
						<Box sx={sxButton}
							onClick={() => dialogSo.setIsPolicyOpen(true)}
						>{t("common.privacy_policy")}</Box>
					</Box>
				</Box>
			)}

			<Box sx={[sxCenter, { p: isDesktop ? undefined : 2 }, sx] as SxProps}>
				{children}
			</Box>

			{isDesktop && (
				<Box sx={sxRight}>
					{rightRender}
				</Box>
			)}

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
	mr: 4,
	mb: 2,
}

const sxButton: SxProps = {
	fontSize: "11px",
	fontWeight: 300,
	opacity: 0.6,
	cursor: "pointer",
	textTransform: "uppercase",
}