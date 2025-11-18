import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Box from '../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Typography from '../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';

const CurrencyLabel = ({
  amount,
  currency
}) => {
  const displayAmount = amount != null ? Math.round(amount / 100).toLocaleString() : "--";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "baseline", gap: 0.5 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { children: displayAmount }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "overline", color: "textSecondary", sx: { fontFamily: "monospace" }, children: currency ?? "---" })
  ] });
};

export { CurrencyLabel as default };
//# sourceMappingURL=CurrencyLabel-DXr2qFgq.js.map
