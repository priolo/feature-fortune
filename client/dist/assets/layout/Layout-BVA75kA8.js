import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import HeaderCmp from './HeaderCmp-DXqpwqU-.js';
import Box from '../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import { Outlet } from '../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

const Layout = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: {
    display: "flex",
    height: "100vh"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderCmp, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "main", sx: sxMain, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] }) });
};
const sxRoot = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
};
const sxMain = {
  flex: 1,
  overflowY: "auto"
};

export { Layout as default };
//# sourceMappingURL=Layout-BVA75kA8.js.map
