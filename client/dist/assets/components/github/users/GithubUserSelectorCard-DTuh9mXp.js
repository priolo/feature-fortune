import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import gitHubApi from '../../../api/githubService-BqlHwAZt.js';
import Card, { sxActionCard } from '../../Card-C-f_ZHMt.js';
import GithubUserViewer from './GithubUserViewer-VO6tziWM.js';
import GithubUsersFinderDialog from './GithubUsersFinderDialog-460V5yXp.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import Typography from '../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import InfoOutline from '../../../node_modules/@mui/icons-material/esm/InfoOutline-D6Mkk2HK.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import GitHub from '../../../node_modules/@mui/icons-material/esm/GitHub-Hwq1NqvR.js';

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
    if (user?.id === githubOwnerId) return;
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
    onChange?.(user2);
  };
  const handleRemoveClick = () => {
    onChange?.(null);
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

export { GithubUserSelectorCard as default };
//# sourceMappingURL=GithubUserSelectorCard-DTuh9mXp.js.map
