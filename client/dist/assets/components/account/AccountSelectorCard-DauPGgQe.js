import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import AccountFinderDialog from "./AccountFinderDialog-CnesawII.js";
import { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import Card, { sxActionCard } from "../Card-BYT7Mzxb.js";
import AccountIdView from "./AccountIdView-VnHSBgGG.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
import Keyboard from "../../node_modules/@mui/icons-material/esm/Keyboard-BHVmWJIG.js";
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
//# sourceMappingURL=AccountSelectorCard-DauPGgQe.js.map
