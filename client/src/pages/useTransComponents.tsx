import themeSo from "@/stores/layout/theme"
import { useMemo } from "react"


export function useTransComponents() {
	
	const palette = themeSo.state.current.palette
	const TransCmps = useMemo(() => [
		<span style={{ color: palette.text.primary, fontWeight: 600 }} />
	], [palette.text.primary])

	return TransCmps
}