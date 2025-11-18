import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import Card from "../../components/Card-DL78qpae.js";
import Framework from "../../layout/Framework-CKUq8ahJ.js";
import MessagesList from "./MessagesList-COJ2br10.js";
import MessageView from "./MessageView-D3pZaf9X.js";
import authSo from "../../stores/auth/repo-DlXMor6z.js";
import dialogSo, { DIALOG_TYPE } from "../../stores/layout/dialogStore-CeVGPxHS.js";
import locationSo, { LOCATION_PAGE } from "../../stores/location/index-D4KyfQ78.js";
import messageListSo from "../../stores/message/list-CBlJowBF.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
const MessagePag = () => {
  var _a;
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
  (_a = authSo.state.user) == null ? void 0 : _a.id;
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
export {
  MessagePag as default
};
//# sourceMappingURL=MessagePag-D5GrltvK.js.map
