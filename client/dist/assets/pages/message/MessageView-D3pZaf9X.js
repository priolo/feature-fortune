import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import React, { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import AccountFinderDialog from "../../components/account/AccountFinderDialog-DK5Z5Bj4.js";
import AccountIdView from "../../components/account/AccountIdView-CkQIUX11.js";
import Card from "../../components/Card-DL78qpae.js";
import messageListSo from "../../stores/message/list-CBlJowBF.js";
import { getAllSenders } from "../../stores/message/utils-Hln6INvg.js";
import ListItemButton from "../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-Nfyp42ot.js";
import TextField from "../../node_modules/@mui/material/esm/TextField/TextField-CkluV2w_.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import Send from "../../node_modules/@mui/icons-material/esm/Send-BQvE5vta.js";
import MessageIcon from "../../node_modules/@mui/icons-material/esm/Message-CULuPavU.js";
const MessageView = ({
  message,
  onChange,
  onSendMessage
}) => {
  var _a, _b, _c, _d;
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const accounts = React.useMemo(() => {
    if (!messageListSo.state.all) return [];
    return getAllSenders(messageListSo.state.all);
  }, [messageListSo.state.all]);
  const handleTextChange = (text) => {
    if (message.content == null) message.content = { text: "" };
    message.content.text = text;
    onChange({ ...message });
  };
  const handleDialogClose = async (account) => {
    setDialogOpen(false);
    if (!account) return;
    onChange({
      ...message,
      content: { ...message.content, accountId: account.id }
    });
  };
  const handleCancelClick = () => {
    onChange(null);
  };
  if (!message) return null;
  const isDisabled = !message.content.accountId || !((_b = (_a = message.content) == null ? void 0 : _a.text) == null ? void 0 : _b.trim().length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageIcon, {}),
        title: "MESSAGE",
        titleEndRender: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "small",
              onClick: handleCancelClick,
              children: "CANCEL"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "contained",
              size: "small",
              startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, {}),
              disabled: isDisabled,
              onClick: onSendMessage,
              children: "SEND"
            }
          )
        ] }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListItemButton,
            {
              onClick: () => setDialogOpen(true),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AccountIdView,
                {
                  accountId: (_c = message.content) == null ? void 0 : _c.accountId
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextField,
            {
              multiline: true,
              autoFocus: true,
              rows: 4,
              placeholder: "Type your message...",
              value: ((_d = message.content) == null ? void 0 : _d.text) ?? "",
              onChange: (e) => handleTextChange(e.target.value)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccountFinderDialog,
      {
        isOpen: dialogOpen,
        suggestedAccounts: accounts,
        onClose: handleDialogClose
      }
    )
  ] });
};
export {
  MessageView as default
};
//# sourceMappingURL=MessageView-D3pZaf9X.js.map
