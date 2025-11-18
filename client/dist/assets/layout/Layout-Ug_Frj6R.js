import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import HeaderCmp from "./HeaderCmp-DlNMqW0g.js";
import Box from "../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import { Outlet } from "../node_modules/react-router/dist/development/chunk-4WY6JWTD-B2TdbP9T.js";
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
//# sourceMappingURL=Layout-Ug_Frj6R.js.map
