import { createStore as bn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';

let resolveClose = null;
var DIALOG_TYPE = /* @__PURE__ */ ((DIALOG_TYPE2) => {
  DIALOG_TYPE2["INFO"] = "info";
  DIALOG_TYPE2["WARNING"] = "warning";
  DIALOG_TYPE2["ERROR"] = "error";
  DIALOG_TYPE2["SUCCESS"] = "success";
  return DIALOG_TYPE2;
})(DIALOG_TYPE || {});
const setup = {
  state: {
    isOpen: false,
    title: "",
    text: "",
    labelOk: "",
    labelCancel: null,
    modal: true,
    // false: Snackbar; true: Dialog
    type: "info" /* INFO */
  },
  getters: {},
  actions: {
    /**
     * Apre la dialog, restituisce un Promise che viene risolto su "dialogClose"
     * @param conf una struttura che indica come deve essere visualizzata la dialog
     */
    dialogOpen: (conf, store) => {
      store.setDialogOpen({
        ...confDefault,
        ...conf
      });
      store.setDialogIsOpen(true);
      return new Promise((resolve, reject) => {
        resolveClose = resolve;
      });
    },
    /**
     * chiude la dialog
     * @param payload un eventuale valore da restituire (dialogOpen risolve un Promise con questo valore)
     */
    dialogClose: (payload, store) => {
      store.setDialogIsOpen(false);
      if (resolveClose) resolveClose(payload);
      resolveClose = null;
      store._update();
    }
  },
  mutators: {
    setDialogIsOpen: (isOpen) => ({ isOpen }),
    setDialogOpen: (conf) => conf
  }
};
const dialogSo = bn(setup);
const confDefault = {
  title: "Info",
  text: "",
  labelOk: "OK",
  labelCancel: null,
  modal: true,
  type: "info" /* INFO */
};

export { DIALOG_TYPE, dialogSo as default };
//# sourceMappingURL=dialogStore-CJYwYBx2.js.map
