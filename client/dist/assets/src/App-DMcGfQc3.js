import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Layout from './layout/Layout-mU5d-F02.js';
import AccountPag from './pages/account/AccountPag-Bn6KJ8Gk.js';
import FeatureListPag from './pages/feature/list/ListPag-oSec4jL3.js';
import FeatureDetailPag from './pages/feature/detail/DetailPag-DW4SZuHL.js';
import LoginPag from './pages/login/LoginPag-FRqdhBnm.js';
import MessagePag from './pages/message/MessagePag-DByHtzIy.js';
import MsgBox from './layout/MsgBox-Cninp1HN.js';
import { useStore as yn } from '../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import themeSo from './stores/layout/theme-BBkHi0mP.js';
import { r as reactExports } from '../node_modules/react/index-D4xv3bQx.js';
import { lightTheme, darkTheme } from './theme/theme-BJnoPDrn.js';
import ThemeProvider from '../node_modules/@mui/material/esm/styles/ThemeProvider-DRi3N5k_.js';
import CssBaseline from '../node_modules/@mui/material/esm/CssBaseline/CssBaseline-UukfMu-_.js';
import { BrowserRouter, Routes, Route } from '../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

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

export { App as default };
//# sourceMappingURL=App-DMcGfQc3.js.map
