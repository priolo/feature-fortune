import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import CurrencyLabel from "../../../components/CurrencyLabel-JwOt1zPP.js";
import { sxRoot, sxContent, sxClips } from "../../../theme/AvatarStyle-BuUq_Z-r.js";
import React from "../../../_virtual/index-B7JGm7Mw.js";
import FeatureStatusChip from "../detail/StatusChip-CgMFCg50.js";
import Box from "../../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Avatar from "../../../node_modules/@mui/material/esm/Avatar/Avatar-BfdFkWnt.js";
import Link from "../../../node_modules/@mui/material/esm/Link/Link-BmGFtcvi.js";
import Typography from "../../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
const FeatureView = ({
  feature,
  sx
}) => {
  const repo = feature.githubRepoMetadata;
  let haveValues = false;
  const valuesDic = feature.fundings.reduce((acc, funding) => {
    const key = funding.currency;
    const amount = funding.amount ?? 0;
    if (amount > 0) haveValues = true;
    let subtotal = acc[key] ?? 0;
    subtotal = subtotal == null ? amount : subtotal + amount;
    acc[key] = subtotal;
    return acc;
  }, {});
  const values = Object.entries(valuesDic);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: [sxRoot, sx], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Avatar,
      {
        src: repo == null ? void 0 : repo.avatar_url,
        alt: repo == null ? void 0 : repo.full_name
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "baseline", gap: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: repo == null ? void 0 : repo.html_url, children: repo == null ? void 0 : repo.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { flex: 1 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "baseline", gap: 1 }, children: [
          !haveValues && "--",
          values.map(([currency, amount], index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyLabel, { amount, currency }),
            index < values.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+" })
          ] }, currency))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "baseline", gap: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", sx: { flex: 1 }, children: feature.title ?? feature.description.slice(0, 200) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxClips, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureStatusChip, { status: feature.status }) })
      ] })
    ] })
  ] });
};
export {
  FeatureView as default
};
//# sourceMappingURL=FeatureView-Ct8MjCJp.js.map
