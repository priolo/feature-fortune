import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import AvatarCmp from "../../components/AvatarCmp-Ban6I1Lf.js";
import messageListSo from "../../stores/message/list-RfsD6ulD.js";
import ActionsMenu from "../../components/ActionsMenu-DWtoKZfg.js";
import messageApi from "../../api/message-gstAydWg.js";
import dialogSo, { DIALOG_TYPE } from "../../stores/layout/dialogStore-Cn--sNeO.js";
import Paper from "../../node_modules/@mui/material/esm/Paper/Paper-BQ1Jdwrl.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
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
//# sourceMappingURL=MessageRow-C44psS3T.js.map
