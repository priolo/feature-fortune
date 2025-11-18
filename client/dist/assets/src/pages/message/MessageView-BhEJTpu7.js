import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import React, { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import AccountFinderDialog from '../../components/account/AccountFinderDialog-504jEO_r.js';
import AccountIdView from '../../components/account/AccountIdView-CgQEbyTf.js';
import Card from '../../components/Card-C8Zv_hyU.js';
import messageListSo from '../../stores/message/list-oXDib70l.js';
import { getAllSenders } from '../../stores/message/utils-CgioDnah.js';
import ListItemButton from '../../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-tVm35zHB.js';
import TextField from '../../../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import Button from '../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Send from '../../../node_modules/@mui/icons-material/esm/Send-DumOug8W.js';
import MessageIcon from '../../../node_modules/@mui/icons-material/esm/Message-DC5VxBek.js';

const MessageView = ({
  message,
  onChange,
  onSendMessage
}) => {
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
  const isDisabled = !message.content.accountId || !message.content?.text?.trim().length;
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
                  accountId: message.content?.accountId
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
              value: message.content?.text ?? "",
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

export { MessageView as default };
//# sourceMappingURL=MessageView-BhEJTpu7.js.map
