import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import MessageBanner from "../../MessageBanner-Clbvx_ZE.js";
import { sxRoot, sxContent, sxClips } from "../../../theme/AvatarStyle-BuUq_Z-r.js";
import { useTranslation } from "../../../node_modules/react-i18next/dist/es/useTranslation-n2p9-xQP.js";
import Box from "../../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Avatar from "../../../node_modules/@mui/material/esm/Avatar/Avatar-BfdFkWnt.js";
import Link from "../../../node_modules/@mui/material/esm/Link/Link-BmGFtcvi.js";
import Typography from "../../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import Chip from "../../../node_modules/@mui/material/esm/Chip/Chip-CUZhAhf1.js";
import Star from "../../../node_modules/@mui/icons-material/esm/Star-DLmbmXV7.js";
const GithubRepoViewer = ({
  repository,
  noLink = false
}) => {
  var _a;
  const { t } = useTranslation();
  if (!repository) return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: t("viewers.githubRepo.empty", "No repository selected") });
  const description = ((_a = repository.description) == null ? void 0 : _a.slice(0, 200)) ?? t("viewers.githubRepo.no_description");
  const topics = repository.topics ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Avatar,
      {
        src: repository.owner.avatar_url,
        alt: repository.owner.login
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: !noLink ? repository.html_url : void 0, children: repository.full_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxClips, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Chip,
          {
            size: "small",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, {}),
            label: repository.stargazers_count
          }
        ),
        topics.slice(0, 10).map((topic, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: topic, size: "small" }, index))
      ] })
    ] })
  ] });
};
export {
  GithubRepoViewer as default
};
//# sourceMappingURL=GithubRepoViewer-DIdqPtcp.js.map
