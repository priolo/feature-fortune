import { j as jsxRuntimeExports } from "./_virtual/jsx-runtime-_Kx_2wye.js";
import Layout from "./layout/Layout-5Cxx-puy.js";
import AccountPag from "./pages/account/AccountPag-BsvCOYkS.js";
import FeatureListPag from "./pages/feature/list/ListPag-DhVivIkl.js";
import FeatureDetailPag from "./pages/feature/detail/DetailPag-Cd9GX_PM.js";
import LoginPag from "./pages/login/LoginPag-CMwE2938.js";
import MessagePag from "./pages/message/MessagePag-D5GrltvK.js";
import MsgBox from "./layout/MsgBox-UoGpKxNb.js";
import { useStore as yn } from "./node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import themeSo from "./stores/layout/theme-CNI2_l_i.js";
import { r as reactExports } from "./_virtual/index-B7JGm7Mw.js";
import { lightTheme, darkTheme } from "./theme/theme-I4_8i1F0.js";
import ThemeProvider from "./node_modules/@mui/material/esm/styles/ThemeProvider-DaZHagTP.js";
import CssBaseline from "./node_modules/@mui/material/esm/CssBaseline/CssBaseline-Boxf3V8i.js";
import { BrowserRouter, Routes, Route } from "./node_modules/react-router/dist/development/chunk-4WY6JWTD-Dd9vUgbO.js";
function App() {
  const themeSa = yn(themeSo);
  const theme = reactExports.useMemo(() => {
    return themeSa.mode === "light" ? lightTheme : darkTheme;
  }, [themeSa.mode]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { theme, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CssBaseline, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Routes, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Route, { path: "/app", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, {}), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { index: true, element: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureListPag, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "account", element: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountPag, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPag, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "messages", element: /* @__PURE__ */ jsxRuntimeExports.jsx(MessagePag, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "feature/:id", element: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureDetailPag, {}) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MsgBox, {})
  ] });
}
export {
  App as default
};
//# sourceMappingURL=App-DvR2YZrS.js.map
