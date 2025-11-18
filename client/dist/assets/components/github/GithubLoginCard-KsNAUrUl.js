import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import gitHubApi from "../../api/githubService-NJYR_CNI.js";
import Card, { sxActionCard } from "../Card-BYT7Mzxb.js";
import GithubUserViewer from "./users/GithubUserViewer-CYvBH6vw.js";
import authSo from "../../stores/auth/repo-BpuRYfKE.js";
import GitHub from "../../node_modules/@mui/icons-material/esm/GitHub-DmSSmHHy.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import React, { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
const GithubLoginCard = ({}) => {
  var _a, _b;
  yn(authSo);
  const userId = (_a = authSo.state.user) == null ? void 0 : _a.githubId;
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
  const haveGithub = !!((_b = authSo.state.user) == null ? void 0 : _b.githubId);
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
export {
  GithubLoginCard as default
};
//# sourceMappingURL=GithubLoginCard-KsNAUrUl.js.map
