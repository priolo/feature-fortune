import { j as jsxRuntimeExports } from '../../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import gitHubApi from '../../../api/githubService-BqlHwAZt.js';
import Card, { sxActionCard } from '../../Card-C8Zv_hyU.js';
import GithubRepoViewer from './GithubRepoViewer-LgRiseld.js';
import GithubReposFinderDialog from './GithubReposFinderDialog-DFXtTJg4.js';
import { r as reactExports } from '../../../../node_modules/react/index-D4xv3bQx.js';
import Typography from '../../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import CheckCircleOutline from '../../../../node_modules/@mui/icons-material/esm/CheckCircleOutline-CwP5u2tx.js';
import Box from '../../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import GitHub from '../../../../node_modules/@mui/icons-material/esm/GitHub-Hwq1NqvR.js';

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
    if (repo?.id === githubRepoId) return;
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
    onChange?.(repo2);
  };
  const handleRemoveClick = () => {
    onChange?.(null);
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

export { GithubRepoSelectorCard as default };
//# sourceMappingURL=GithubRepoSelectorCard-DOhUzNBK.js.map
