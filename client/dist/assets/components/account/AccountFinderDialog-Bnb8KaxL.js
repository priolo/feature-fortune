import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import accountApi from '../../api/account-C6WnE6OX.js';
import React, { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import AccountViewer from './AccountViewer-XcXErH_-.js';
import MessageBanner from '../MessageBanner-DET9uRoX.js';
import Dialog from '../../node_modules/@mui/material/esm/Dialog/Dialog-DnBhiBv0.js';
import DialogTitle from '../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-HCfi_f08.js';
import LinearProgress from '../../node_modules/@mui/material/esm/LinearProgress/LinearProgress-BEaiuMD_.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import TextField from '../../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import DialogContent from '../../node_modules/@mui/material/esm/DialogContent/DialogContent-CXvC-oj7.js';
import List from '../../node_modules/@mui/material/esm/List/List-Cn7hm2Lr.js';
import ListItem from '../../node_modules/@mui/material/esm/ListItem/ListItem-Dh_gUZ-4.js';
import ListItemText from '../../node_modules/@mui/material/esm/ListItemText/ListItemText-CfsVfgtK.js';
import ListItemButton from '../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-tVm35zHB.js';
import DialogActions from '../../node_modules/@mui/material/esm/DialogActions/DialogActions-C4kVUFW5.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';

const AccountFinderDialog = ({
  isOpen,
  suggestedAccounts,
  onClose
}) => {
  const [filterText, setFilterText] = React.useState("");
  let [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    setItems([]);
    setFilterText("");
    setLoading(false);
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const searchAccounts = async () => {
      if (filterText.length < 3) return;
      setLoading(true);
      try {
        const result = await accountApi.index({ text: filterText });
        setItems(result);
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      searchAccounts();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [filterText]);
  const handleClose = (reason) => {
    onClose(null);
  };
  const handleItemClick = async (account) => {
    onClose(account);
  };
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  if (!loading && items.length == 0 && filterText.length < 3) {
    items = suggestedAccounts ?? [];
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { onClose: handleClose, open: isOpen, maxWidth: "sm", fullWidth: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Select Account" }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LinearProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { px: 3, pb: 2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextField,
      {
        autoFocus: true,
        value: filterText ?? "",
        onChange: handleFilterChange,
        placeholder: "Type to filter accounts..."
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(List, { sx: { maxHeight: 400, overflow: "auto" }, children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(ListItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "Searching..." }) }),
      !loading && items.map((account) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListItem, { disablePadding: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => handleItemClick(account), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountViewer, { account }) }) }, account.id)),
      !loading && items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: "No accounts found." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => handleClose(), children: "Cancel" }) })
  ] });
};

export { AccountFinderDialog as default };
//# sourceMappingURL=AccountFinderDialog-Bnb8KaxL.js.map
