import { Box, SxProps } from '@mui/material';
import React, { FunctionComponent } from "react";



interface Props {
	/** Titolo che appare a sinistra */
	title?: string | React.ReactNode
	/** sottotitolo, appare minore nella riga in basso al "title" */
	subtitle?: React.ReactNode
	sx?: SxProps
	sxLabel?: SxProps
	sxValue?: SxProps
	children?: React.ReactNode
}

const Paragraph: FunctionComponent<Props> = ({
	title,
	subtitle,
	sx,
	sxLabel,
	sxValue,
	children,
}) => {

	return <Box sx={[sxRoot, sx] as SxProps}>

		<Box sx={[sxLabelRoot, sxLabel] as SxProps}>
			<Box sx={sxTitle}>{title}</Box>
			{subtitle && (<Box sx={sxSubtitle}>{subtitle}</Box>)}
		</Box>

		<Box sx={[sxRootChildren, sxValue] as SxProps}>
			{children}
		</Box>

	</Box>
}

export default Paragraph

const sxRoot: SxProps = {
	display: "flex",
	alignItems: "center",
}

const sxLabelRoot: SxProps = {
	flex: .15,
	display: "flex",
	flexDirection: "column",
	paddingRight: "15px"
}

const sxTitle: SxProps = {
	fontWeight: 500,
	fontSize: 14,
	opacity: .8,
}

const sxSubtitle: SxProps = {
	mt: "-4px",
	mb: "-10px",
	fontSize: 11,
	fontWeight: 300,
	opacity: .5,
}

const sxRootChildren: SxProps = {
	display: "flex",
	flex: 1,
}