import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import AvatarCmp from "../../components/AvatarCmp-CQaTe6Gh.js";
import messageListSo from "../../stores/message/list-CBlJowBF.js";
import ActionsMenu from "../../components/ActionsMenu-7oF1XTDK.js";
import messageApi from "../../api/message-BITHuatt.js";
import dialogSo, { DIALOG_TYPE } from "../../stores/layout/dialogStore-CeVGPxHS.js";
import Paper from "../../node_modules/@mui/material/esm/Paper/Paper-DgjLhxCX.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
const MessageRow = ({
  message
}) => {
  var _a, _b, _c, _d, _e, _f;
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const handleSendClick = async (action) => {
    var _a2;
    messageListSo.createAndSelect((_a2 = message.content) == null ? void 0 : _a2.accountId);
  };
  const handleAsUnreadClick = async (action) => {
  };
  const handleDeleteClick = async (action) => {
    await messageListSo.remove(message.id);
    dialogSo.dialogOpen({
      text: "Message removed",
      modal: false,
      type: DIALOG_TYPE.SUCCESS
    });
  };
  const handleToggleExpanded = () => {
    setIsExpanded((prev) => !prev);
    if (isRead) return;
    messageListSo.setAll(messageListSo.state.all.map(
      (msg) => msg.id == message.id ? { ...msg, isRead: true } : msg
    ));
    messageApi.markAsRead(message.id);
  };
  const isRead = message.isRead;
  const isSystem = !((_a = message.content) == null ? void 0 : _a.accountId);
  const accountName = ((_c = (_b = message.content) == null ? void 0 : _b.account) == null ? void 0 : _c.name) ?? "SYSTEM";
  const createAt = new Date(((_d = message.content) == null ? void 0 : _d.createdAt) || "").toLocaleString();
  const displayText = ((_e = message.content) == null ? void 0 : _e.text) ?? "";
  const textStyles = isExpanded ? { cursor: "pointer", whiteSpace: "pre-line" } : { cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { variant: "outlined", sx: sxContainer(isRead), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "center", mb: 2 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AvatarCmp,
        {
          account: (_f = message.content) == null ? void 0 : _f.account
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { flexGrow: 1, ml: 2 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "subtitle1", sx: { fontWeight: isRead ? 500 : 600 }, children: accountName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "caption", color: "text.secondary", children: createAt })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionsMenu,
        {
          actions: [
            {
              hidden: isSystem,
              label: "SEND",
              onClick: handleSendClick
            },
            {
              hidden: !isRead,
              label: "AS UNREAD",
              onClick: handleAsUnreadClick
            },
            {
              hidden: isSystem && !isRead,
              label: "---"
            },
            {
              label: "DELETE",
              onClick: handleDeleteClick
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Typography,
      {
        variant: "body1",
        sx: textStyles,
        onClick: handleToggleExpanded,
        children: displayText
      }
    )
  ] });
};
const sxContainer = (isRead) => ({
  p: 2,
  borderRadius: 3,
  borderColor: isRead ? null : "secondary.main"
  // transition: 'background-color 0.2s ease',
  // '&:hover': {
  // 	bgcolor: isRead ? 'background.paper' : 'action.hover',
  // 	boxShadow: 3,
  // },
});
export {
  MessageRow as default
};
//# sourceMappingURL=MessageRow-CXvpW8sb.js.map
