import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import gitHubApi from '../../../api/githubService-BqlHwAZt.js';
import React, { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import GithubUserViewer from './GithubUserViewer-VO6tziWM.js';
import Dialog from '../../../node_modules/@mui/material/esm/Dialog/Dialog-DnBhiBv0.js';
import DialogTitle from '../../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-HCfi_f08.js';
import LinearProgress from '../../../node_modules/@mui/material/esm/LinearProgress/LinearProgress-BEaiuMD_.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import TextField from '../../../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import DialogContent from '../../../node_modules/@mui/material/esm/DialogContent/DialogContent-CXvC-oj7.js';
import List from '../../../node_modules/@mui/material/esm/List/List-Cn7hm2Lr.js';
import ListItem from '../../../node_modules/@mui/material/esm/ListItem/ListItem-Dh_gUZ-4.js';
import ListItemText from '../../../node_modules/@mui/material/esm/ListItemText/ListItemText-CfsVfgtK.js';
import ListItemButton from '../../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-tVm35zHB.js';
import DialogActions from '../../../node_modules/@mui/material/esm/DialogActions/DialogActions-C4kVUFW5.js';
import Button from '../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';

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

export { GithubUsersFinderDialog as default };
//# sourceMappingURL=GithubUsersFinderDialog-460V5yXp.js.map
