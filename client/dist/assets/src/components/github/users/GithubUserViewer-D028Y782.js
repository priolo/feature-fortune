import { j as jsxRuntimeExports } from '../../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import MessageBanner from '../../MessageBanner-BVGtKpdD.js';
import { sxRoot, sxContent, sxClips } from '../../../theme/AvatarStyle-Bvo1PtIp.js';
import dayjs from '../../../../node_modules/dayjs/dayjs.min--KArvKZb.js';
import Box from '../../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Avatar from '../../../../node_modules/@mui/material/esm/Avatar/Avatar-Fp6XlwQN.js';
import Link from '../../../../node_modules/@mui/material/esm/Link/Link-UAO14PDu.js';
import Typography from '../../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Chip from '../../../../node_modules/@mui/material/esm/Chip/Chip-CN5I0e23.js';

const GithubUserViewer = ({
  user,
  noLink
}) => {
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: "void" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Avatar,
      {
        src: user.avatar_url,
        alt: user.login
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "baseline", gap: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: !noLink ? user.html_url : void 0, children: user.login }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "overline", color: "text.secondary", children: user.company })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxClips, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            size: "small",
            label: dayjs(user.created_at).format("MMM YYYY")
          }
        ),
        user.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            size: "small",
            label: user.location
          }
        ),
        user.public_repos && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            label: `Repo: ${user.public_repos}`
          }
        ),
        user.followers && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            label: `Followers: ${user.followers}`
          }
        ),
        user.following && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            label: `Following: ${user.following}`
          }
        )
      ] })
    ] })
  ] });
};

export { GithubUserViewer as default };
//# sourceMappingURL=GithubUserViewer-D028Y782.js.map
