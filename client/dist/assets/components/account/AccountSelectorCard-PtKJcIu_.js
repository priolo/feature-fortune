import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import AccountFinderDialog from "./AccountFinderDialog-DK5Z5Bj4.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import Card, { sxActionCard } from "../Card-DL78qpae.js";
import AccountIdView from "./AccountIdView-CkQIUX11.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import Keyboard from "../../node_modules/@mui/icons-material/esm/Keyboard-CT2-qpU3.js";
const AccountSelectorCard = ({
  title,
  icon,
  accountId,
  readOnly,
  message,
  onChange
}) => {
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const handleSelectClick = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = async (account) => {
    setDialogOpen(false);
    if (!account) return;
    onChange == null ? void 0 : onChange(account);
  };
  const handleRemoveClick = () => {
    onChange == null ? void 0 : onChange(null);
  };
  const isSelected = !!accountId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        id: "account-selector-card",
        title,
        icon: icon ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard, {}),
        titleEndRender: !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxActionCard, children: [
          isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleRemoveClick,
              children: "REMOVE"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSelectClick,
              children: !!isSelected ? "CHANGE" : "SELECT"
            }
          )
        ] }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccountIdView, { accountId })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccountFinderDialog,
      {
        isOpen: dialogOpen,
        onClose: handleDialogClose
      }
    )
  ] });
};
export {
  AccountSelectorCard as default
};
//# sourceMappingURL=AccountSelectorCard-PtKJcIu_.js.map
