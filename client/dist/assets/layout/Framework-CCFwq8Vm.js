import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Box from '../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';

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

export { Framework as default };
//# sourceMappingURL=Framework-CCFwq8Vm.js.map
