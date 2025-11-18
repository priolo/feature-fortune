import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import AvatarCmp from "../AvatarCmp-Ban6I1Lf.js";
import CurrencyLabel from "../CurrencyLabel-YPgRDaLI.js";
import StatusChip from "./StatusChip-BnEVrRfX.js";
import { sxRoot, sxContent } from "../../theme/AvatarStyle-BuUq_Z-r.js";
import stripeApi from "../../api/stripe-_TQaUbHg.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
const FundingView = ({
  funding
}) => {
  var _a;
  const handlePayNow = async (funding2) => {
    const result = await stripeApi.pay(funding2.id);
    console.log(result);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarCmp, { account: funding.account }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { sx: { flex: 1 }, children: ((_a = funding.account) == null ? void 0 : _a.name) ?? "Unknown Account" }),
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
export {
  FundingView as default
};
//# sourceMappingURL=FundingView-YffCrLfa.js.map
