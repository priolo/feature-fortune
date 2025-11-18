import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import Dialog from "../../node_modules/@mui/material/esm/Dialog/Dialog-DZU3zwFJ.js";
import DialogTitle from "../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-B9BTm8q0.js";
import DialogContent from "../../node_modules/@mui/material/esm/DialogContent/DialogContent-Crqz8Xcb.js";
import TextField from "../../node_modules/@mui/material/esm/TextField/TextField-CkluV2w_.js";
import DialogActions from "../../node_modules/@mui/material/esm/DialogActions/DialogActions-Dp6a-FyR.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
const CommentDialog = ({
  isOpen,
  onClose
}) => {
  const [message, setMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isOpen) setMessage("");
  }, [isOpen]);
  const handleClose = (reason) => {
    onClose == null ? void 0 : onClose(null);
  };
  const handleOk = () => {
    const comment = {
      text: message.trim() || void 0
    };
    onClose == null ? void 0 : onClose(comment);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { onClose: handleClose, open: isOpen, maxWidth: "sm", fullWidth: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "COMMENT" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextField,
      {
        multiline: true,
        rows: 4,
        fullWidth: true,
        value: message || "",
        onChange: (e) => setMessage(e.target.value),
        placeholder: "Add a message"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogActions, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => handleClose(), children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleOk, variant: "contained", color: "primary", children: "OK" })
    ] })
  ] });
};
export {
  CommentDialog as default
};
//# sourceMappingURL=CommentDialog-BIG0p6Qk.js.map
