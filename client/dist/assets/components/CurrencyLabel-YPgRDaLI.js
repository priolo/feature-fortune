import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import Box from "../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Typography from "../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
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
export {
  CurrencyLabel as default
};
//# sourceMappingURL=CurrencyLabel-YPgRDaLI.js.map
