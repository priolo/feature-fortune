import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import { FUNDING_STATUS } from '../../types/Funding-dHhWNkJ5.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import CurrencyField from '../CurrencyField-lnUkAsen.js';
import Paragraph from '../../layout/Paragraph-xFBbwgfJ.js';
import Dialog from '../../node_modules/@mui/material/esm/Dialog/Dialog-DnBhiBv0.js';
import DialogTitle from '../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-HCfi_f08.js';
import DialogContent from '../../node_modules/@mui/material/esm/DialogContent/DialogContent-CXvC-oj7.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Typography from '../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import TextField from '../../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import DialogActions from '../../node_modules/@mui/material/esm/DialogActions/DialogActions-C4kVUFW5.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';

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
    onClose?.(null);
  };
  const handleOk = () => {
    onClose?.(funding);
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

export { FundingDialog as default };
//# sourceMappingURL=FundingDialog-B9wIVAXj.js.map
