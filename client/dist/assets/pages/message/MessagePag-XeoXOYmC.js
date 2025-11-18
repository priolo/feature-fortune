import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Card from '../../components/Card-C-f_ZHMt.js';
import Framework from '../../layout/Framework-CCFwq8Vm.js';
import MessagesList from './MessagesList-BY1sa6AB.js';
import MessageView from './MessageView-CckL7phN.js';
import authSo from '../../stores/auth/repo-gcvx48OU.js';
import dialogSo, { DIALOG_TYPE } from '../../stores/layout/dialogStore-BFo7mydR.js';
import locationSo, { LOCATION_PAGE } from '../../stores/location/index-3g9xZMzJ.js';
import messageListSo from '../../stores/message/list-Bj7w0DpV.js';
import { useStore as yn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';

const MessagePag = () => {
  yn(messageListSo);
  reactExports.useEffect(() => {
    locationSo.setCurrent(LOCATION_PAGE.Messages);
    messageListSo.fetch();
  }, []);
  const handleSendMessage = async () => {
    await messageListSo.sendSelected();
    dialogSo.dialogOpen({
      text: "Message sent",
      modal: false,
      type: DIALOG_TYPE.SUCCESS
    });
  };
  const handleMessageChange = (message) => {
    messageListSo.setSelected(message);
  };
  const selected = messageListSo.state.selected;
  authSo.state.user?.id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Framework, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { pt: 2, bgcolor: "background.default", position: "sticky", top: 0, zIndex: 10, boxShadow: 5 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MessageView,
      {
        message: selected,
        onChange: handleMessageChange,
        onSendMessage: handleSendMessage
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "MESSAGES", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesList, {}) })
  ] });
};

export { MessagePag as default };
//# sourceMappingURL=MessagePag-XeoXOYmC.js.map
