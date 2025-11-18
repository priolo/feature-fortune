import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import featureDetailSo from "../../stores/feature/detail-KnQIQZkT.js";
import fundingListSo from "../../stores/funding/list-CZKAPf8D.js";
import { sxContent } from "../../theme/AvatarStyle-BuUq_Z-r.js";
import dayjs from "../../_virtual/dayjs.min-B5P_oKVh.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import AvatarCmp from "../AvatarCmp-CQaTe6Gh.js";
import Build from "../../node_modules/@mui/icons-material/esm/Build-5ujFkFcl.js";
import Person from "../../node_modules/@mui/icons-material/esm/Person-B4wnBitl.js";
import AttachMoney from "../../node_modules/@mui/icons-material/esm/AttachMoney-D0AqJYAi.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import Chip from "../../node_modules/@mui/material/esm/Chip/Chip-CUZhAhf1.js";
const CommentRow = ({
  comment,
  onClick
}) => {
  var _a;
  const dateStr = dayjs(comment.createdAt).format("MMM D, YYYY h:mm A");
  const chips = reactExports.useMemo(() => {
    var _a2, _b, _c;
    const items = [];
    if (((_a2 = featureDetailSo.state.feature) == null ? void 0 : _a2.accountDevId) === comment.accountId) {
      items.push({ label: "DEVELOPER", color: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Build, { fontSize: "small" }) });
    }
    if (((_b = featureDetailSo.state.feature) == null ? void 0 : _b.accountId) === comment.accountId) {
      items.push({ label: "AUTHOR", color: "secondary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Person, { fontSize: "small" }) });
    }
    if ((_c = fundingListSo.state.all) == null ? void 0 : _c.some((f) => f.accountId === comment.accountId)) {
      items.push({ label: "FOUDER", color: "success", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(AttachMoney, { fontSize: "small" }) });
    }
    return items;
  }, [comment, featureDetailSo.state.feature, fundingListSo.state.all]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRow, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Box,
      {
        sx: sxAvatarRow,
        onClick: () => onClick == null ? void 0 : onClick(comment),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarCmp, { account: comment.account }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { sx: { flex: 1 }, children: ((_a = comment.account) == null ? void 0 : _a.name) ?? "Unknown Account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "overline", color: "textSecondary", children: dateStr })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { display: "flex", gap: 1, alignItems: "center" }, children: chips.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Chip,
              {
                size: "small",
                label: item.label,
                color: item.color,
                icon: item.icon
              },
              index
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { whiteSpace: "pre-wrap", children: comment.text })
  ] });
};
const sxRow = {
  display: "flex",
  flexDirection: "column",
  gap: 1
  // cursor: onClick ? 'pointer' : 'default',
  // '&:hover': onClick ? {
  //     backgroundColor: 'action.hover'
  // } : {}
};
const sxAvatarRow = {
  display: "flex",
  gap: 1,
  alignItems: "center"
};
export {
  CommentRow as default
};
//# sourceMappingURL=CommentRow-CEenqwm0.js.map
