import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-_Kx_2wye.js";
import dialogSo, { DIALOG_TYPE } from "../stores/layout/dialogStore-CeVGPxHS.js";
import { useStore as yn } from "../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import Snackbar from "../node_modules/@mui/material/esm/Snackbar/Snackbar-CkltHolp.js";
import IconButton from "../node_modules/@mui/material/esm/IconButton/IconButton-Di2_t52h.js";
import CloseIcon from "../node_modules/@mui/icons-material/esm/Close-BzxsT9HO.js";
import Box from "../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Dialog from "../node_modules/@mui/material/esm/Dialog/Dialog-DZU3zwFJ.js";
import DialogTitle from "../node_modules/@mui/material/esm/DialogTitle/DialogTitle-B9BTm8q0.js";
import DialogContent from "../node_modules/@mui/material/esm/DialogContent/DialogContent-Crqz8Xcb.js";
import DialogContentText from "../node_modules/@mui/material/esm/DialogContentText/DialogContentText-DzfsOFHm.js";
import DialogActions from "../node_modules/@mui/material/esm/DialogActions/DialogActions-Dp6a-FyR.js";
import Button from "../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import WarningIcon from "../node_modules/@mui/icons-material/esm/Warning-CHspitep.js";
import SuccessIcon from "../node_modules/@mui/icons-material/esm/ThumbUp-C1Fi9HPY.js";
import ErrorIcon from "../node_modules/@mui/icons-material/esm/Error-Dm8UHe7x.js";
import InfoIcon from "../node_modules/@mui/icons-material/esm/Info-CNcuNpRM.js";
const MsgBox = () => {
  const dialogSa = yn(dialogSo);
  const data = typeData[dialogSa.type ?? DIALOG_TYPE.INFO];
  const colorBg = `${data.color}.main`;
  const colorFg = `${data.color}.contrastText`;
  if (!dialogSa.modal) return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Snackbar,
    {
      ContentProps: { sx: { bgcolor: colorBg, color: colorFg } },
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      open: dialogSa.isOpen,
      autoHideDuration: 6e3,
      onClose: () => dialogSo.dialogClose(),
      message: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
        data.icon,
        dialogSa.text
      ] }),
      action: /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconButton,
        {
          size: "small",
          color: "inherit",
          onClick: dialogSo.dialogClose,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {})
        }
      )
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dialog,
    {
      open: dialogSa.isOpen,
      onClose: () => dialogSo.dialogClose(false),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
          data.icon,
          dialogSa.title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentText, { children: dialogSa.text }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogActions, { children: [
          dialogSa.labelCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => dialogSo.dialogClose(false),
              children: dialogSa.labelCancel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              sx: { color: colorBg },
              onClick: () => dialogSo.dialogClose(true),
              children: dialogSa.labelOk
            }
          )
        ] })
      ]
    }
  );
};
const typeData = {
  [DIALOG_TYPE.INFO]: {
    color: "primary",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, { fontSize: "medium" })
  },
  [DIALOG_TYPE.ERROR]: {
    color: "error",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorIcon, { fontSize: "medium" })
  },
  [DIALOG_TYPE.SUCCESS]: {
    color: "success",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessIcon, { fontSize: "medium" })
  },
  [DIALOG_TYPE.WARNING]: {
    color: "warning",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WarningIcon, { fontSize: "medium" })
  }
};
export {
  MsgBox as default
};
//# sourceMappingURL=MsgBox-UoGpKxNb.js.map
