import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
const CreditCardViewer = ({ card }) => {
  if (!card) return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { children: "No Card Data" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      sx: {
        border: "1px solid #ccc",
        borderRadius: 1,
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { fontSize: "1.2em" }, children: [
          "**** **** **** ",
          card.last4
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { fontSize: "0.9em", color: "text.secondary" }, children: [
          card.brand.toUpperCase(),
          " ",
          card.exp_month,
          "/",
          card.exp_year
        ] })
      ]
    }
  );
};
export {
  CreditCardViewer as default
};
//# sourceMappingURL=CreditCardViewer-CslQM04Z.js.map
