import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-_Kx_2wye.js";
import HeaderCmp from "./HeaderCmp-F_eWn-JD.js";
import Box from "../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import { Outlet } from "../node_modules/react-router/dist/development/chunk-4WY6JWTD-Dd9vUgbO.js";
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
export {
  Layout as default
};
//# sourceMappingURL=Layout-5Cxx-puy.js.map
