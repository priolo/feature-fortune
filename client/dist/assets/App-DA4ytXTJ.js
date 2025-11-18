import { j as jsxRuntimeExports } from "./_virtual/jsx-runtime-CocFHxF7.js";
import Layout from "./layout/Layout-Ug_Frj6R.js";
import AccountPag from "./pages/account/AccountPag-Dsj-gUZT.js";
import FeatureListPag from "./pages/feature/list/ListPag-5H5xwRg6.js";
import FeatureDetailPag from "./pages/feature/detail/DetailPag-Dc_FWHHW.js";
import LoginPag from "./pages/login/LoginPag-CdWjwu5C.js";
import MessagePag from "./pages/message/MessagePag-CHFW10KS.js";
import MsgBox from "./layout/MsgBox-Ccrqik79.js";
import { useStore as yn } from "./node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import themeSo from "./stores/layout/theme-BqegWWpc.js";
import { r as reactExports } from "./_virtual/index-CKgvjd_4.js";
import { lightTheme, darkTheme } from "./theme/theme-NdOX9xwC.js";
import ThemeProvider from "./node_modules/@mui/material/esm/styles/ThemeProvider-Dw0r-ugE.js";
import CssBaseline from "./node_modules/@mui/material/esm/CssBaseline/CssBaseline-opRfAiz-.js";
import { BrowserRouter, Routes, Route } from "./node_modules/react-router/dist/development/chunk-4WY6JWTD-B2TdbP9T.js";
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
//# sourceMappingURL=App-DA4ytXTJ.js.map
