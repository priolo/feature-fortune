import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-CocFHxF7.js";
import MessageBanner from "../../MessageBanner-B4TvhSX-.js";
import { sxRoot, sxContent, sxClips } from "../../../theme/AvatarStyle-BuUq_Z-r.js";
import dayjs from "../../../_virtual/dayjs.min-B5P_oKVh.js";
import Box from "../../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Avatar from "../../../node_modules/@mui/material/esm/Avatar/Avatar-_FVrP-oe.js";
import Link from "../../../node_modules/@mui/material/esm/Link/Link-C1fHK5lI.js";
import Typography from "../../../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
import Chip from "../../../node_modules/@mui/material/esm/Chip/Chip-CIGG8gt9.js";
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
export {
  GithubUserViewer as default
};
//# sourceMappingURL=GithubUserViewer-CYvBH6vw.js.map
