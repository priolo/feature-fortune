import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import Card from "../../components/Card-BYT7Mzxb.js";
import Framework from "../../layout/Framework-xovDwbrU.js";
import MessagesList from "./MessagesList-BTqb20lb.js";
import MessageView from "./MessageView-CgaKSoPH.js";
import authSo from "../../stores/auth/repo-BpuRYfKE.js";
import dialogSo, { DIALOG_TYPE } from "../../stores/layout/dialogStore-Cn--sNeO.js";
import locationSo, { LOCATION_PAGE } from "../../stores/location/index-CWD3Tsyk.js";
import messageListSo from "../../stores/message/list-RfsD6ulD.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
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
//# sourceMappingURL=MessagePag-CHFW10KS.js.map
