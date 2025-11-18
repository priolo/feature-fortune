import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import messageListSo from "../../stores/message/list-RfsD6ulD.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import MessageBanner from "../../components/MessageBanner-B4TvhSX-.js";
import MessageRow from "./MessageRow-C44psS3T.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import { useSearchParams } from "../../node_modules/react-router/dist/development/chunk-4WY6JWTD-B2TdbP9T.js";
const MessagesList = ({}) => {
  yn(messageListSo);
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("receiver");
  const messages = reactExports.useMemo(() => {
    const all = messageListSo.state.all;
    if (all == null) return [];
    const messages2 = !receiverId ? all : all.filter((message) => {
      var _a;
      const accountId = (_a = message.content) == null ? void 0 : _a.accountId;
      return accountId == receiverId || accountId == null && receiverId == "sys";
    });
    return messages2.sort((msg1, msg2) => new Date(msg2.createdAt).getTime() - new Date(msg1.createdAt).getTime());
  }, [messageListSo.state.all, receiverId]);
  if (!messages || messages.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: "No messages yet. Start a conversation!" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { display: "flex", flexDirection: "column", gap: 2 }, children: messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    MessageRow,
    {
      message
    },
    message.id
  )) });
};
export {
  MessagesList as default
};
//# sourceMappingURL=MessagesList-BTqb20lb.js.map
