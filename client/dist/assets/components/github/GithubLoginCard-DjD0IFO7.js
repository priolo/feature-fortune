import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import gitHubApi from '../../api/githubService-BqlHwAZt.js';
import Card, { sxActionCard } from '../Card-C-f_ZHMt.js';
import GithubUserViewer from './users/GithubUserViewer-VO6tziWM.js';
import authSo from '../../stores/auth/repo-gcvx48OU.js';
import GitHub from '../../node_modules/@mui/icons-material/esm/GitHub-Hwq1NqvR.js';
import { useStore as yn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import React, { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import Typography from '../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';

const GithubLoginCard = ({}) => {
  yn(authSo);
  const userId = authSo.state.user?.githubId;
  const [user, setUser] = React.useState(null);
  reactExports.useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }
    async function load() {
      const user2 = await gitHubApi.getUserById(userId);
      setUser(user2);
    }
    load();
  }, [userId]);
  const handleLogin = () => {
    authSo.loginWithGithub();
  };
  const handleAttach = async () => {
    authSo.attachGithub();
  };
  const handleDetach = async () => {
    authSo.detachGithub();
  };
  const logged = !!authSo.state.user;
  const haveGithub = !!authSo.state.user?.githubId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      id: "github-login-card",
      title: "GitHub access",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitHub, { color: "primary" }),
      children: [
        !!haveGithub && /* @__PURE__ */ jsxRuntimeExports.jsx(GithubUserViewer, { user }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: "Autenticati con GitHub per collegare rapidamente i tuoi repository e le tue richieste." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxActionCard, children: !!logged && !haveGithub ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleAttach,
            children: "ATTACH"
          }
        ) : !!logged && haveGithub ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleDetach,
            children: "DETACH"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleLogin,
            children: "ACCEDI"
          }
        ) })
      ]
    }
  );
};

export { GithubLoginCard as default };
//# sourceMappingURL=GithubLoginCard-DjD0IFO7.js.map
