import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import React, { r as reactExports } from "../../../_virtual/index-B7JGm7Mw.js";
import gitHubApi from "../../../api/githubService-NJYR_CNI.js";
import GithubRepoViewer from "./GithubRepoViewer-DIdqPtcp.js";
import Dialog from "../../../node_modules/@mui/material/esm/Dialog/Dialog-DZU3zwFJ.js";
import DialogTitle from "../../../node_modules/@mui/material/esm/DialogTitle/DialogTitle-B9BTm8q0.js";
import LinearProgress from "../../../node_modules/@mui/material/esm/LinearProgress/LinearProgress-DiIGbHP-.js";
import Box from "../../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import TextField from "../../../node_modules/@mui/material/esm/TextField/TextField-CkluV2w_.js";
import DialogContent from "../../../node_modules/@mui/material/esm/DialogContent/DialogContent-Crqz8Xcb.js";
import List from "../../../node_modules/@mui/material/esm/List/List-EbspPVNA.js";
import ListItem from "../../../node_modules/@mui/material/esm/ListItem/ListItem-D5XoI6qw.js";
import ListItemText from "../../../node_modules/@mui/material/esm/ListItemText/ListItemText-MW4luZMS.js";
import ListItemButton from "../../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-Nfyp42ot.js";
import DialogActions from "../../../node_modules/@mui/material/esm/DialogActions/DialogActions-Dp6a-FyR.js";
import Button from "../../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
const GithubReposFinderDialog = ({
  isOpen,
  placeholder = "Type to filter items...",
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
        const result = await gitHubApi.searchRepositories(filterText, 10);
        setItems(result.items);
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      searchRepositories();
    }, 800);
    return () => clearTimeout(debounceTimer);
  }, [filterText]);
  const handleClose = (reason) => {
    onClose(null);
  };
  const handleItemClick = async (repo) => {
    onClose(repo);
  };
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dialog,
    {
      maxWidth: "sm",
      fullWidth: true,
      open: isOpen,
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Select GitHub Repository" }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LinearProgress, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { px: 3, pb: 2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextField,
          {
            autoFocus: true,
            value: filterText ?? "",
            onChange: handleFilterChange,
            placeholder
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(List, { sx: { maxHeight: 400, overflow: "auto" }, children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(ListItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "Searching..." }) }),
          !loading && items.map((repo) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListItem, { divider: true, disablePadding: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => handleItemClick(repo), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GithubRepoViewer, { noLink: true, repository: repo }) }) }, repo.id))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => handleClose(), children: "Cancel" }) })
      ]
    }
  );
};
export {
  GithubReposFinderDialog as default
};
//# sourceMappingURL=GithubReposFinderDialog-MsAvUc3G.js.map
