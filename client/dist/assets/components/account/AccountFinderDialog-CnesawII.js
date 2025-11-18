import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import accountApi from "../../api/account-DvUun04q.js";
import React, { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import AccountViewer from "./AccountViewer-CHbI7SBg.js";
import MessageBanner from "../MessageBanner-B4TvhSX-.js";
import Dialog from "../../node_modules/@mui/material/esm/Dialog/Dialog-CGmKSS7p.js";
import DialogTitle from "../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-BYHfSoPn.js";
import LinearProgress from "../../node_modules/@mui/material/esm/LinearProgress/LinearProgress-DAnuXsFE.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import TextField from "../../node_modules/@mui/material/esm/TextField/TextField-YzDg_6yu.js";
import DialogContent from "../../node_modules/@mui/material/esm/DialogContent/DialogContent-RxK1Hotu.js";
import List from "../../node_modules/@mui/material/esm/List/List-B0BooIe5.js";
import ListItem from "../../node_modules/@mui/material/esm/ListItem/ListItem-DACBzrJf.js";
import ListItemText from "../../node_modules/@mui/material/esm/ListItemText/ListItemText-C1wj9SVj.js";
import ListItemButton from "../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-4XAy6lAX.js";
import DialogActions from "../../node_modules/@mui/material/esm/DialogActions/DialogActions-BQrKJAbM.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
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
//# sourceMappingURL=AccountFinderDialog-CnesawII.js.map
