import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import Card, { sxActionCard } from "../Card-DL78qpae.js";
import Paragraph from "../../layout/Paragraph-Dij3llV3.js";
import authSo from "../../stores/auth/repo-DlXMor6z.js";
import MailOutlineIcon from "../../node_modules/@mui/icons-material/esm/MailOutline-Bj_ZAHhc.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import TextField from "../../node_modules/@mui/material/esm/TextField/TextField-CkluV2w_.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import Dialog from "../../node_modules/@mui/material/esm/Dialog/Dialog-DZU3zwFJ.js";
import DialogTitle from "../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-B9BTm8q0.js";
import DialogContent from "../../node_modules/@mui/material/esm/DialogContent/DialogContent-Crqz8Xcb.js";
import DialogActions from "../../node_modules/@mui/material/esm/DialogActions/DialogActions-Dp6a-FyR.js";
import InfoOutline from "../../node_modules/@mui/icons-material/esm/InfoOutline-DnBXaGO6.js";
import WarningAmber from "../../node_modules/@mui/icons-material/esm/WarningAmber-BLMy7Utn.js";
import Done from "../../node_modules/@mui/icons-material/esm/Done-Ci9nN64U.js";
const EmailLoginCard = ({}) => {
  var _a, _b, _c;
  yn(authSo);
  const [emailDialogIsOpen, setEmailDialogIsOpen] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState(((_a = authSo.state.user) == null ? void 0 : _a.email) || "");
  const [code, setCode] = reactExports.useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleSendEmailClick = async () => {
    if (!email) return alert("Devi inserire una email valida");
    try {
      await authSo.emailSendCode(email);
      setEmailDialogIsOpen(true);
    } catch (err) {
      alert("Errore nell'invio del codice");
    }
  };
  const handleVerifyAndClose = async () => {
    if (!code) return alert("Devi inserire un codice valido");
    try {
      await authSo.emailVerifyCode(code);
      alert("Email verificata con successo");
      setEmailDialogIsOpen(false);
    } catch (err) {
      alert("Errore nella verifica del codice");
    }
  };
  const handleClose = () => {
    setEmailDialogIsOpen(false);
  };
  const logged = !!authSo.state.user;
  const haveEmail = !!((_b = authSo.state.user) == null ? void 0 : _b.email);
  const isVerified = !!((_c = authSo.state.user) == null ? void 0 : _c.emailVerified);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        id: "email-login-card",
        title: "Email access",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MailOutlineIcon, { color: "primary" }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { logged, haveEmail, isVerified }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Paragraph, { title: "EMAIL ADDRESS", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextField,
            {
              fullWidth: true,
              size: "small",
              value: email,
              onChange: handleEmailChange,
              placeholder: "Type your email"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxActionCard, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSendEmailClick,
              children: isVerified ? "REINVIA" : "INVIA CODICE"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Dialog,
      {
        maxWidth: "sm",
        fullWidth: true,
        open: emailDialogIsOpen,
        onClose: handleClose,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Verifica il codice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { sx: sxDialogContent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: "Abbiamo inviato un codice al tuo indirizzo email. Inseriscilo qui sotto per verificare la tua identita." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TextField,
              {
                fullWidth: true,
                size: "small",
                label: "Codice",
                value: code,
                onChange: handleCodeChange,
                placeholder: "Type code sent to your email"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogActions, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleClose, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleVerifyAndClose, variant: "contained", children: "Verify" })
          ] })
        ]
      }
    )
  ] });
};
const sxDialogContent = {
  display: "flex",
  flexDirection: "column",
  gap: 2
};
const Message = ({
  logged,
  haveEmail,
  isVerified
}) => {
  if (!logged) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoOutline, { color: "primary", sx: sxIcon }),
      "Inserisci la tua email. Riceverai un codice di conferma.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "Ti permetterà di ricevere le notifiche e di accedere al tuo account senza password."
    ] });
  }
  if (!haveEmail) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WarningAmber, { color: "warning", sx: sxIcon }),
      "Il tuo account non ha ancora una email associata. Inseriscila qui sotto per ricevere un codice di accesso temporaneo."
    ] });
  }
  if (!isVerified) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WarningAmber, { color: "warning", sx: sxIcon }),
      "La tua email non è ancora verificata. Inseriscila qui sotto per ricevere un codice di accesso temporaneo."
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Done, { color: "success", sx: sxIcon }),
    "La tua email è verificata."
  ] });
};
const sxIcon = {
  fontSize: "1.4em",
  verticalAlign: "text-bottom",
  ml: "2px",
  mr: "6px"
};
export {
  EmailLoginCard as default
};
//# sourceMappingURL=EmailLoginCard-Di3aAcVD.js.map
