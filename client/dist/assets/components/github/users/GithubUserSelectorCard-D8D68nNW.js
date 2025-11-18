import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import gitHubApi from "../../../api/githubService-NJYR_CNI.js";
import Card, { sxActionCard } from "../../Card-DL78qpae.js";
import GithubUserViewer from "./GithubUserViewer-J2jNnJMh.js";
import GithubUsersFinderDialog from "./GithubUsersFinderDialog-DtbgwQmY.js";
import { r as reactExports } from "../../../_virtual/index-B7JGm7Mw.js";
import Typography from "../../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import InfoOutline from "../../../node_modules/@mui/icons-material/esm/InfoOutline-DnBXaGO6.js";
import Box from "../../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Button from "../../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import GitHub from "../../../node_modules/@mui/icons-material/esm/GitHub-oKshU6h0.js";
const GithubUserSelectorCard = ({
  githubOwnerId,
  readOnly,
  onChange
}) => {
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [user, setUser] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!githubOwnerId) {
      setUser(null);
      return;
    }
    if ((user == null ? void 0 : user.id) === githubOwnerId) return;
    const load = async () => {
      const owner = await gitHubApi.getUserById(githubOwnerId);
      setUser(owner);
    };
    load();
  }, [githubOwnerId]);
  const handleSelectUserClick = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = (user2) => {
    setDialogOpen(false);
    if (!user2) return;
    onChange == null ? void 0 : onChange(user2);
  };
  const handleRemoveClick = () => {
    onChange == null ? void 0 : onChange(null);
  };
  const isSelected = !!user;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        title: "GITHUB USER",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitHub, {}),
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
              onClick: handleSelectUserClick,
              children: isSelected ? "CHANGE" : "SELECT"
            }
          )
        ] }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", sx: { mb: 1 }, color: "text.secondary", children: isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoOutline, { color: "primary", sx: sxIcon }),
            "Questo è solo un segnaposto dell'utente Github collegato al feature. Chi dovrà occuparsi di implementare la feature è il ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "DEVELOPER" }),
            "."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Facoltativo: seleziona un utente GitHub collegato al feature." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GithubUserViewer, { user })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GithubUsersFinderDialog,
      {
        isOpen: dialogOpen,
        onClose: handleDialogClose
      }
    )
  ] });
};
const sxIcon = {
  fontSize: "1.4em",
  verticalAlign: "text-bottom",
  ml: "2px",
  mr: "6px"
};
export {
  GithubUserSelectorCard as default
};
//# sourceMappingURL=GithubUserSelectorCard-D8D68nNW.js.map
