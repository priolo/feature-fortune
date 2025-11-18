import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import featureDetailSo from '../../stores/feature/detail-BTgOX7nk.js';
import fundingListSo from '../../stores/funding/list-C5l-pKwZ.js';
import { sxContent } from '../../theme/AvatarStyle-Bvo1PtIp.js';
import dayjs from '../../node_modules/dayjs/dayjs.min--KArvKZb.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import AvatarCmp from '../AvatarCmp-MyyrF_MY.js';
import Build from '../../node_modules/@mui/icons-material/esm/Build-DoCW4MU6.js';
import Person from '../../node_modules/@mui/icons-material/esm/Person-BvTMQW2G.js';
import AttachMoney from '../../node_modules/@mui/icons-material/esm/AttachMoney-Bep2NmSG.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Typography from '../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Chip from '../../node_modules/@mui/material/esm/Chip/Chip-CN5I0e23.js';

const CommentRow = ({
  comment,
  onClick
}) => {
  const dateStr = dayjs(comment.createdAt).format("MMM D, YYYY h:mm A");
  const chips = reactExports.useMemo(() => {
    const items = [];
    if (featureDetailSo.state.feature?.accountDevId === comment.accountId) {
      items.push({ label: "DEVELOPER", color: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Build, { fontSize: "small" }) });
    }
    if (featureDetailSo.state.feature?.accountId === comment.accountId) {
      items.push({ label: "AUTHOR", color: "secondary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Person, { fontSize: "small" }) });
    }
    if (fundingListSo.state.all?.some((f) => f.accountId === comment.accountId)) {
      items.push({ label: "FOUDER", color: "success", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(AttachMoney, { fontSize: "small" }) });
    }
    return items;
  }, [comment, featureDetailSo.state.feature, fundingListSo.state.all]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRow, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Box,
      {
        sx: sxAvatarRow,
        onClick: () => onClick?.(comment),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarCmp, { account: comment.account }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxContent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { sx: { flex: 1 }, children: comment.account?.name ?? "Unknown Account" }),
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

export { CommentRow as default };
//# sourceMappingURL=CommentRow-BxlC7azL.js.map
