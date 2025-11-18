import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import AvatarCmp from '../AvatarCmp-SyzdOpfe.js';
import CurrencyLabel from '../CurrencyLabel-BMy7NivM.js';
import StatusChip from './StatusChip-D8lFWtUS.js';
import { sxRoot, sxContent } from '../../theme/AvatarStyle-Bvo1PtIp.js';
import stripeApi from '../../api/stripe-B4wG5V8M.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Typography from '../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Button from '../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';

const FundingView = ({
  funding
}) => {
  const handlePayNow = async (funding2) => {
    const result = await stripeApi.pay(funding2.id);
    console.log(result);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarCmp, { account: funding.account }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { sx: { flex: 1 }, children: funding.account?.name ?? "Unknown Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "contained", size: "small", onClick: () => handlePayNow(funding), children: "PAY NOW" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyLabel, { amount: funding.amount, currency: funding.currency })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { sx: { flex: 1, overflowWrap: "break-word" }, children: funding.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChip, { status: funding.status })
      ] })
    ] })
  ] });
};

export { FundingView as default };
//# sourceMappingURL=FundingView-Dfe7sn-O.js.map
