import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import accountApi from "../../api/account-BmJ7MWCd.js";
import React, { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import AccountViewer from "./AccountViewer-BXau98DW.js";
import MessageBanner from "../MessageBanner-Clbvx_ZE.js";
import Dialog from "../../node_modules/@mui/material/esm/Dialog/Dialog-DZU3zwFJ.js";
import DialogTitle from "../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-B9BTm8q0.js";
import LinearProgress from "../../node_modules/@mui/material/esm/LinearProgress/LinearProgress-DiIGbHP-.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import TextField from "../../node_modules/@mui/material/esm/TextField/TextField-CkluV2w_.js";
import DialogContent from "../../node_modules/@mui/material/esm/DialogContent/DialogContent-Crqz8Xcb.js";
import List from "../../node_modules/@mui/material/esm/List/List-EbspPVNA.js";
import ListItem from "../../node_modules/@mui/material/esm/ListItem/ListItem-D5XoI6qw.js";
import ListItemText from "../../node_modules/@mui/material/esm/ListItemText/ListItemText-MW4luZMS.js";
import ListItemButton from "../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-Nfyp42ot.js";
import DialogActions from "../../node_modules/@mui/material/esm/DialogActions/DialogActions-Dp6a-FyR.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
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
export {
  AccountFinderDialog as default
};
//# sourceMappingURL=AccountFinderDialog-DK5Z5Bj4.js.map
