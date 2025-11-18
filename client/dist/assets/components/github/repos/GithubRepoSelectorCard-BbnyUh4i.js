import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import gitHubApi from "../../../api/githubService-NJYR_CNI.js";
import Card, { sxActionCard } from "../../Card-DL78qpae.js";
import GithubRepoViewer from "./GithubRepoViewer-DIdqPtcp.js";
import GithubReposFinderDialog from "./GithubReposFinderDialog-MsAvUc3G.js";
import { r as reactExports } from "../../../_virtual/index-B7JGm7Mw.js";
import Typography from "../../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import CheckCircleOutline from "../../../node_modules/@mui/icons-material/esm/CheckCircleOutline-DCy960Uj.js";
import Box from "../../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Button from "../../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import GitHub from "../../../node_modules/@mui/icons-material/esm/GitHub-oKshU6h0.js";
const GithubRepoSelectorCard = ({
  githubRepoId,
  readOnly,
  onChange
}) => {
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [repo, setRepo] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!githubRepoId) {
      setRepo(null);
      return;
    }
    if ((repo == null ? void 0 : repo.id) === githubRepoId) return;
    const load = async () => {
      const repo2 = await gitHubApi.getRepository(githubRepoId);
      setRepo(repo2);
    };
    load();
  }, [githubRepoId]);
  const handleFindRepoClick = () => {
    setDialogOpen(true);
  };
  const handleRepoDialogClose = async (repo2) => {
    setDialogOpen(false);
    if (!repo2) return;
    onChange == null ? void 0 : onChange(repo2);
  };
  const handleRemoveClick = () => {
    onChange == null ? void 0 : onChange(null);
  };
  const isSelected = !!repo;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        title: "GITHUB REPOSITORY",
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
              onClick: handleFindRepoClick,
              children: isSelected ? "CHANGE" : "SELECT"
            }
          )
        ] }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", sx: { mb: 1 }, color: "text.secondary", children: isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircleOutline, { color: "success", sx: sxIcon }),
            "Questo è il repo su cui si chiede la feature."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Seleziona un repository GitHub su cui si vuole la feature." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GithubRepoViewer, { repository: repo })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GithubReposFinderDialog,
      {
        isOpen: dialogOpen,
        onClose: handleRepoDialogClose
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
  GithubRepoSelectorCard as default
};
//# sourceMappingURL=GithubRepoSelectorCard-BbnyUh4i.js.map
