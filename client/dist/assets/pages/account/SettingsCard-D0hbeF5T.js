import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import Card, { sxActionCard } from "../../components/Card-DL78qpae.js";
import Paragraph from "../../layout/Paragraph-Dij3llV3.js";
import authSo from "../../stores/auth/repo-DlXMor6z.js";
import themeSo from "../../stores/layout/theme-CNI2_l_i.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import { useTranslation } from "../../node_modules/react-i18next/dist/es/useTranslation-n2p9-xQP.js";
import TextField from "../../node_modules/@mui/material/esm/TextField/TextField-CkluV2w_.js";
import IconButton from "../../node_modules/@mui/material/esm/IconButton/IconButton-Di2_t52h.js";
import DarkModeIcon from "../../node_modules/@mui/icons-material/esm/Brightness4-B-3hmOvy.js";
import LightModeIcon from "../../node_modules/@mui/icons-material/esm/Brightness7-D3Q7ml8t.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import Select from "../../node_modules/@mui/material/esm/Select/Select-ZTzvy7s1.js";
import MenuItem from "../../node_modules/@mui/material/esm/MenuItem/MenuItem-nJ4nQcqC.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import Settings from "../../node_modules/@mui/icons-material/esm/Settings-C7lo8ToH.js";
const SettingsCard = ({}) => {
  var _a;
  const themeSa = yn(themeSo);
  const { i18n, t } = useTranslation();
  const handleThemeToggle = () => {
    themeSo.toggleMode();
  };
  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };
  const handleSave = () => {
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      id: "settings-card",
      title: "Settings",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { color: "primary" }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paragraph, { title: "NAME", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            size: "small",
            fullWidth: true,
            value: ((_a = authSo.state.user) == null ? void 0 : _a.name) ?? "",
            onChange: (e) => authSo.setUser({ ...authSo.state.user, name: e.target.value })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Paragraph, { title: "THEME", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconButton,
            {
              onClick: handleThemeToggle,
              color: "primary",
              size: "large",
              sx: {
                bgcolor: "background.paper",
                "&:hover": { bgcolor: "action.selected" }
              },
              children: themeSa.mode === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx(DarkModeIcon, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(LightModeIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { flex: 1 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body1", sx: { fontWeight: 500 }, children: themeSa.mode === "light" ? "Light Mode" : "Dark Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: themeSa.mode === "light" ? "Switch to dark theme for better visibility in low light" : "Switch to light theme for better visibility in bright environments" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paragraph, { title: "LANGUAGE", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            variant: "outlined",
            size: "small",
            fullWidth: true,
            value: i18n.language,
            onChange: handleLanguageChange,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { value: "en", children: "English" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxActionCard, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSave,
            children: "SAVE"
          }
        ) })
      ]
    }
  );
};
export {
  SettingsCard as default
};
//# sourceMappingURL=SettingsCard-D0hbeF5T.js.map
