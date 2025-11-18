import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import AvatarCmp from '../../components/AvatarCmp-SyzdOpfe.js';
import messageListSo from '../../stores/message/list-oXDib70l.js';
import ActionsMenu from '../../components/ActionsMenu-BEei2quI.js';
import messageApi from '../../api/message-DnJxHYgO.js';
import dialogSo, { DIALOG_TYPE } from '../../stores/layout/dialogStore-CJYwYBx2.js';
import Paper from '../../../node_modules/@mui/material/esm/Paper/Paper-91yl6fdr.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Typography from '../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';

const MessageRow = ({
  message
}) => {
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const handleSendClick = async (action) => {
    messageListSo.createAndSelect(message.content?.accountId);
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
  const isSystem = !message.content?.accountId;
  const accountName = message.content?.account?.name ?? "SYSTEM";
  const createAt = new Date(message.content?.createdAt || "").toLocaleString();
  const displayText = message.content?.text ?? "";
  const textStyles = isExpanded ? { cursor: "pointer", whiteSpace: "pre-line" } : { cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { variant: "outlined", sx: sxContainer(isRead), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { display: "flex", alignItems: "center", mb: 2 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AvatarCmp,
        {
          account: message.content?.account
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

export { MessageRow as default };
//# sourceMappingURL=MessageRow-B3P4YUCM.js.map
