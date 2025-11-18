import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import AvatarCmp from "../AvatarCmp-CQaTe6Gh.js";
import MessageBanner from "../MessageBanner-Clbvx_ZE.js";
import { sxRoot, sxContent, sxClips } from "../../theme/AvatarStyle-BuUq_Z-r.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import Chip from "../../node_modules/@mui/material/esm/Chip/Chip-CUZhAhf1.js";
import Done from "../../node_modules/@mui/icons-material/esm/Done-Ci9nN64U.js";
import WarningAmber from "../../node_modules/@mui/icons-material/esm/WarningAmber-BLMy7Utn.js";
import PriorityHigh from "../../node_modules/@mui/icons-material/esm/PriorityHigh-CNkbMJK7.js";
const AccountViewer = ({
  account
}) => {
  if (!account) return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: "No Account Selected" });
  const stripeAccProps = !!account.stripeAccountId ? account.stripeAccountStatus === "ready" ? { color: "success", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Done, {}), label: "STRIPE READY" } : { color: "warning", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WarningAmber, {}), label: "STRIPE INCOMPLETE" } : { color: "error", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityHigh, { sx: { width: 14, height: 14 } }), label: "NO STRIPE" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarCmp, { account }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { children: account.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxClips, children: [
        account.emailVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Done, {}),
            color: "success",
            label: "VERIFIED"
          }
        ),
        account.googleEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            color: "primary",
            label: "GOOGLE"
          }
        ),
        account.githubId && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            color: "primary",
            label: "GITHUB"
          }
        ),
        account.stripeHaveCard && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            label: "CARD"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { ...stripeAccProps })
      ] })
    ] })
  ] });
};
export {
  AccountViewer as default
};
//# sourceMappingURL=AccountViewer-BXau98DW.js.map
