import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import Dialog from '../../../node_modules/@mui/material/esm/Dialog/Dialog-DnBhiBv0.js';
import DialogTitle from '../../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-HCfi_f08.js';
import DialogContent from '../../../node_modules/@mui/material/esm/DialogContent/DialogContent-CXvC-oj7.js';
import TextField from '../../../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import DialogActions from '../../../node_modules/@mui/material/esm/DialogActions/DialogActions-C4kVUFW5.js';
import Button from '../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';

const CommentDialog = ({
  isOpen,
  onClose
}) => {
  const [message, setMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isOpen) setMessage("");
  }, [isOpen]);
  const handleClose = (reason) => {
    onClose?.(null);
  };
  const handleOk = () => {
    const comment = {
      text: message.trim() || void 0
    };
    onClose?.(comment);
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

export { CommentDialog as default };
//# sourceMappingURL=CommentDialog-CMUzqoQ_.js.map
