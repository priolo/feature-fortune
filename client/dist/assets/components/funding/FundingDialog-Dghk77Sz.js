import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import { FUNDING_STATUS } from "../../types/Funding-B4L2sI4r.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import CurrencyField from "../CurrencyField-F4w0cjhl.js";
import Paragraph from "../../layout/Paragraph-Dij3llV3.js";
import Dialog from "../../node_modules/@mui/material/esm/Dialog/Dialog-DZU3zwFJ.js";
import DialogTitle from "../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-B9BTm8q0.js";
import DialogContent from "../../node_modules/@mui/material/esm/DialogContent/DialogContent-Crqz8Xcb.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import TextField from "../../node_modules/@mui/material/esm/TextField/TextField-CkluV2w_.js";
import DialogActions from "../../node_modules/@mui/material/esm/DialogActions/DialogActions-Dp6a-FyR.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
const FundingDialog = ({
  fundingToEdit,
  isOpen,
  onClose
}) => {
  const [funding, setFunding] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const defaultFunding = fundingToEdit ?? {
      currency: "USD",
      amount: 500,
      status: FUNDING_STATUS.PENDING,
      message: "",
      featureId: null
    };
    setFunding(defaultFunding);
  }, [isOpen, fundingToEdit]);
  const handlePropChange = (newProp) => {
    setFunding((last) => ({ ...last, ...newProp }));
  };
  const handleClose = () => {
    onClose == null ? void 0 : onClose(null);
  };
  const handleOk = () => {
    onClose == null ? void 0 : onClose(funding);
  };
  if (!funding) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dialog,
    {
      onClose: handleClose,
      open: isOpen,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "CONTRIBUTE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", flexDirection: "column", gap: 2, mt: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Paragraph, { title: "AMOUNT", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CurrencyField,
            {
              currency: funding.currency,
              value: funding.amount,
              onChange: (value, currency) => handlePropChange({ amount: value, currency })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", whiteSpace: "pre-line", children: `Puoi annullare il finanziamento in qualunque momento durante lo sviluppo della FEATURE.
						Quando FEATURE è dichiarata COMPLETED da (nome_autore)
						riceverai una notifica e avrai 24 ore di tempo per annullare il finanziamento (se non ti convince)
						altrimenti avverrà il pagamento in automatico.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextField,
            {
              multiline: true,
              fullWidth: true,
              rows: 4,
              value: funding.message ?? "",
              onChange: (e) => handlePropChange({ message: e.target.value }),
              placeholder: "Se vuoi inserisci un messaggio (opzionale)"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogActions, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleClose,
              children: "CANCEL"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "contained",
              color: "primary",
              onClick: handleOk,
              children: "OK"
            }
          )
        ] })
      ]
    }
  );
};
export {
  FundingDialog as default
};
//# sourceMappingURL=FundingDialog-Dghk77Sz.js.map
