import { StoreCore, createStore } from "@priolo/jon"
import i18n from "../../plugins/i18n"

/**
 * Gestione della dialog
 * Questa puo' essere modale o snackbar
 */

// used when dialog closed
let resolveClose = null

export enum DIALOG_TYPE {
	INFO = "info",
	WARNING = "warning",
	ERROR = "error",
	SUCCESS = "success",
}

/**
 * una struttura che indica come deve essere visualizzata la dialog
 */
export interface DialogMsg {
	title?: string
	text?: string
	labelOk?: string
	labelCancel?: string
	modal?: boolean
	type?: DIALOG_TYPE
}

const setup = {

	state: {
		// per la policy dialog
		isPolicyOpen: false,

		isOpen: false,
		title: "",
		text: "",
		labelOk: "",
		labelCancel: <string>null,
		modal: true, // false: Snackbar; true: Dialog
		type: DIALOG_TYPE.INFO,
	},

	getters: {
	},

	actions: {
		/**
		 * Apre la dialog, restituisce un Promise che viene risolto su "dialogClose"
		 * @param conf una struttura che indica come deve essere visualizzata la dialog
		 */
		dialogOpen: (conf: DialogMsg, store?: DialogStore) => {
			const defaults: DialogMsg = {
				title: i18n.t(`common.msgbox.${conf.type ?? DIALOG_TYPE.INFO}`),
				text: "",
				labelOk: i18n.t("common.ok"),
				labelCancel: i18n.t("common.cancel"),
				modal: false,
				type: DIALOG_TYPE.INFO,
			}
			store.setDialogOpen({
				...defaults,
				...conf,
			})
			store.setDialogIsOpen(true)
			return new Promise<any>((resolve, reject) => {
				resolveClose = resolve
			})
		},
		/**
		 * chiude la dialog
		 * @param payload un eventuale valore da restituire (dialogOpen risolve un Promise con questo valore)
		 */
		dialogClose: (payload?: any, store?: DialogStore) => {
			store.setDialogIsOpen(false)
			if (resolveClose) resolveClose(payload)
			resolveClose = null;
			store._update()
		}
	},

	mutators: {
		setDialogIsOpen: (isOpen: boolean) => ({ isOpen }),
		setDialogOpen: (conf: DialogMsg) => conf,
		setIsPolicyOpen: (isPolicyOpen: boolean) => ({ isPolicyOpen }),
	},
}

export type DialogState = typeof setup.state
export type DialogGetters = typeof setup.getters
export type DialogActions = typeof setup.actions
export type DialogMutators = typeof setup.mutators
export interface DialogStore extends StoreCore<DialogState>, DialogGetters, DialogActions, DialogMutators {
	state: DialogState
}
const dialogSo = createStore(setup) as DialogStore
export default dialogSo
