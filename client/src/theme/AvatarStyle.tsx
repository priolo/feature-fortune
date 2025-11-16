import { SxProps } from "@mui/material"


export const sxRoot: SxProps = {
	flex: 1, 
	display: 'flex', 
	gap: 1.5, 
	alignItems: 'center'
}

export const sxContent: SxProps = {
	flex: 1,
	display: 'flex', 
	flexDirection: "column", 
	gap: .5, 
	overflow: 'hidden'
}

export const sxClips:SxProps = {
	display: 'flex', gap: 0.5, flexWrap: 'wrap'
}