import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Card, { sxActionCard } from '../../components/Card-C-f_ZHMt.js';
import Paragraph from '../../layout/Paragraph-xFBbwgfJ.js';
import authSo from '../../stores/auth/repo-gcvx48OU.js';
import themeSo from '../../stores/layout/theme-rwTbxzrt.js';
import { useStore as yn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { useTranslation } from '../../node_modules/react-i18next/dist/es/useTranslation-S8sclbEg.js';
import TextField from '../../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import IconButton from '../../node_modules/@mui/material/esm/IconButton/IconButton-VKzCU0qt.js';
import DarkModeIcon from '../../node_modules/@mui/icons-material/esm/Brightness4-120RxZLk.js';
import LightModeIcon from '../../node_modules/@mui/icons-material/esm/Brightness7-39XZJ2YR.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Typography from '../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Select from '../../node_modules/@mui/material/esm/Select/Select-0bwdIv9I.js';
import MenuItem from '../../node_modules/@mui/material/esm/MenuItem/MenuItem-Dfle30b-.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Settings from '../../node_modules/@mui/icons-material/esm/Settings-w7OcXy97.js';

const SettingsCard = ({}) => {
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
            value: authSo.state.user?.name ?? "",
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

export { SettingsCard as default };
//# sourceMappingURL=SettingsCard-DuPKGISI.js.map
