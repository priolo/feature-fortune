import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import FeatureListHeader from '../pages/feature/list/ListHeader-DPkemf-p.js';
import locationSo, { LOCATION_PAGE } from '../stores/location/index-ChdRpV7e.js';
import { useStore as yn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import UserCmp from './UserCmp-Dii1qFf2.js';
import FeatureDetailHeader from '../pages/feature/detail/DetailHeader-C6o3YAH8.js';
import LoginHeader from '../pages/login/LoginHeader-BgFNGQ1w.js';
import AccountHeader from '../pages/account/AccountHeader-DHdtfVJs.js';
import MessageHeader from '../pages/message/MessageHeader-BDruZw4c.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Tooltip from '../../node_modules/@mui/material/esm/Tooltip/Tooltip-DnxfmlZG.js';
import IconButton from '../../node_modules/@mui/material/esm/IconButton/IconButton-VKzCU0qt.js';
import MailIcon from '../../node_modules/@mui/icons-material/esm/Mail-Cq9-sCUE.js';
import { useNavigate } from '../../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

const HeaderCmp = ({}) => {
  yn(locationSo);
  const navigate = useNavigate();
  const header = reactExports.useMemo(() => {
    return {
      [LOCATION_PAGE.FeaturesList]: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureListHeader, {}),
      [LOCATION_PAGE.FeatureDetail]: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureDetailHeader, {}),
      [LOCATION_PAGE.Login]: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginHeader, {}),
      [LOCATION_PAGE.Account]: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountHeader, {}),
      [LOCATION_PAGE.Messages]: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageHeader, {})
    }[locationSo.state.current];
  }, [locationSo.state.current]);
  const handleMessagesClick = () => {
    navigate("/app/messages");
  };
  const handleLogoClick = () => {
    navigate("/app/");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleLogoClick,
        children: "LOGO"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { flex: 1, display: "flex", minWidth: "800px", alignItems: "center", gap: 2 }, children: header }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: "Messages", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { onClick: handleMessagesClick, color: "inherit", size: "medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MailIcon, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCmp, {})
    ] })
  ] });
};
const sxRoot = {
  backgroundColor: "background.paper",
  borderBottom: 1,
  borderColor: "divider",
  padding: "0 2rem",
  height: "70px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: 1,
  flexShrink: 0
};

export { HeaderCmp as default };
//# sourceMappingURL=HeaderCmp-Bb4eWFQO.js.map
