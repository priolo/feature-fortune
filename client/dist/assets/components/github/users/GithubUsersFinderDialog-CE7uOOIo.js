import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-CocFHxF7.js";
import gitHubApi from "../../../api/githubService-NJYR_CNI.js";
import React, { r as reactExports } from "../../../_virtual/index-CKgvjd_4.js";
import GithubUserViewer from "./GithubUserViewer-CYvBH6vw.js";
import Dialog from "../../../node_modules/@mui/material/esm/Dialog/Dialog-CGmKSS7p.js";
import DialogTitle from "../../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-BYHfSoPn.js";
import LinearProgress from "../../../node_modules/@mui/material/esm/LinearProgress/LinearProgress-DAnuXsFE.js";
import Box from "../../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import TextField from "../../../node_modules/@mui/material/esm/TextField/TextField-YzDg_6yu.js";
import DialogContent from "../../../node_modules/@mui/material/esm/DialogContent/DialogContent-RxK1Hotu.js";
import List from "../../../node_modules/@mui/material/esm/List/List-B0BooIe5.js";
import ListItem from "../../../node_modules/@mui/material/esm/ListItem/ListItem-DACBzrJf.js";
import ListItemText from "../../../node_modules/@mui/material/esm/ListItemText/ListItemText-C1wj9SVj.js";
import ListItemButton from "../../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-4XAy6lAX.js";
import DialogActions from "../../../node_modules/@mui/material/esm/DialogActions/DialogActions-BQrKJAbM.js";
import Button from "../../../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
const GithubUsersFinderDialog = ({
  isOpen,
  onClose
}) => {
  const [filterText, setFilterText] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const searchRepositories = async () => {
      if (filterText.length < 3) return;
      setLoading(true);
      try {
        const result = await gitHubApi.searchUsers(filterText, 10);
        setItems(result);
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      searchRepositories();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [filterText]);
  const handleClose = (reason) => {
    onClose(null);
  };
  const handleItemClick = async (user) => {
    onClose(user);
  };
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { onClose: handleClose, open: isOpen, maxWidth: "xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Select GitHub User" }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LinearProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { px: 3, pb: 2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextField,
      {
        autoFocus: true,
        value: filterText ?? "",
        onChange: handleFilterChange,
        placeholder: "Type to filter items..."
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(List, { sx: { maxHeight: 400, overflow: "auto" }, children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(ListItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "Searching..." }) }),
      !loading && items.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListItem, { disablePadding: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => handleItemClick(user), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GithubUserViewer, { noLink: true, user }) }) }, user.id))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => handleClose(), children: "Cancel" }) })
  ] });
};
export {
  GithubUsersFinderDialog as default
};
//# sourceMappingURL=GithubUsersFinderDialog-CE7uOOIo.js.map
