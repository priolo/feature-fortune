import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import messageListSo from '../../stores/message/list-oXDib70l.js';
import { useStore as yn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import MessageBanner from '../../components/MessageBanner-BVGtKpdD.js';
import MessageRow from './MessageRow-B3P4YUCM.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import { useSearchParams } from '../../../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

const MessagesList = ({}) => {
  yn(messageListSo);
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("receiver");
  const messages = reactExports.useMemo(() => {
    const all = messageListSo.state.all;
    if (all == null) return [];
    const messages2 = !receiverId ? all : all.filter((message) => {
      const accountId = message.content?.accountId;
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

export { MessagesList as default };
//# sourceMappingURL=MessagesList-Dj8ZdzIz.js.map
