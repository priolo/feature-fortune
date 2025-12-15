import { StoreCore, createStore } from "@priolo/jon"
import { Dimension } from "../../types/global"



/**
 * enum dei device gestiti
 */
export enum DEVICE_TYPE {
	DESKTOP,
	MOBILE,
}
export enum DEVICE_ORIENTATION {
	LANDSCAPE,
	PORTRAIT
}

/**
 * indica che tipo di device si tratta
 */
const setup = {

	state: () => {
		const type = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
			? DEVICE_TYPE.MOBILE : DEVICE_TYPE.DESKTOP
		return {
			type,
			dimension: <Dimension>{ width: 0, height: 0 },
			//size: DEVICE_SCREEN_SIZE.UNKNOW,
			linkIdSelect: <string>null,	
		}
	},

	getters: {
		isDesktop: (_: void, store?: DeviceStore): boolean => store.state.type == DEVICE_TYPE.DESKTOP,
	},

	actions: {
	},

	mutators: {
		setDimension: (dimension: Dimension) => ({ dimension }),
	},
}

export type DeviceState = ReturnType<typeof setup.state>
export type DeviceGetters = typeof setup.getters
export type DeviceActions = typeof setup.actions
export type DeviceMutators = typeof setup.mutators
export interface DeviceStore extends StoreCore<DeviceState>, DeviceGetters, DeviceActions, DeviceMutators {
	state: DeviceState
}
const deviceSo = createStore(setup) as DeviceStore
export default deviceSo



const onResize = () => {
	deviceSo.setDimension({
		width: window.innerWidth,
		height: window.innerHeight,
	})
	//const maxDim = Math.max(window.innerWidth, window.innerHeight)
	//deviceSo.setSize(maxDim >= 1024 ? DEVICE_SCREEN_SIZE.HI : DEVICE_SCREEN_SIZE.MEDIUM)
	// const orientation = screen.orientation.type;
	// store.setOrietation ( orientation === "portrait-primary" || orientation === "portrait-secondary")
	// 	? portrait : LANDSCAPE
}
window.addEventListener("resize", onResize)
onResize()