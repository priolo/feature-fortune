import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-_Kx_2wye.js";
import Box from "../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
const Framework = ({
  children,
  sx,
  leftRender
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", justifyContent: "center", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxSide, children: leftRender }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: [sxRoot, sx], children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxSide })
  ] });
};
const sxRoot = {
  flex: "0 1 800px",
  //width: '100%',
  //marginX: 'auto',
  display: "flex",
  flexDirection: "column",
  gap: 2,
  maxWidth: 800
};
const sxSide = {
  flex: 1,
  minWidth: 32
};
export {
  Framework as default
};
//# sourceMappingURL=Framework-CKUq8ahJ.js.map
