import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import AccountFinderDialog from './AccountFinderDialog-Bnb8KaxL.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import Card, { sxActionCard } from '../Card-C-f_ZHMt.js';
import AccountIdView from './AccountIdView-C6BMPqyI.js';
import Typography from '../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Keyboard from '../../node_modules/@mui/icons-material/esm/Keyboard-C3J8Da9N.js';

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
    onChange?.(account);
  };
  const handleRemoveClick = () => {
    onChange?.(null);
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

export { AccountSelectorCard as default };
//# sourceMappingURL=AccountSelectorCard-DwGwEFD9.js.map
