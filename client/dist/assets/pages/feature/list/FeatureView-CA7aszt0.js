import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import CurrencyLabel from '../../../components/CurrencyLabel-DXr2qFgq.js';
import { sxRoot, sxContent, sxClips } from '../../../theme/AvatarStyle-Bvo1PtIp.js';
import React from '../../../node_modules/react/index-D4xv3bQx.js';
import FeatureStatusChip from '../detail/StatusChip-B4qlWVlM.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Avatar from '../../../node_modules/@mui/material/esm/Avatar/Avatar-Fp6XlwQN.js';
import Link from '../../../node_modules/@mui/material/esm/Link/Link-UAO14PDu.js';
import Typography from '../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';

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
        src: repo?.avatar_url,
        alt: repo?.full_name
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "baseline", gap: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: repo?.html_url, children: repo?.full_name }),
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

export { FeatureView as default };
//# sourceMappingURL=FeatureView-CA7aszt0.js.map
