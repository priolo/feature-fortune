import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import AvatarCmp from "../AvatarCmp-CQaTe6Gh.js";
import CurrencyLabel from "../CurrencyLabel-JwOt1zPP.js";
import StatusChip from "./StatusChip-X9KAO9uE.js";
import { sxRoot, sxContent } from "../../theme/AvatarStyle-BuUq_Z-r.js";
import stripeApi from "../../api/stripe-wnAuqk6X.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
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
//# sourceMappingURL=FundingView-j-V26pdu.js.map
