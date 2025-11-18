import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import BackButton from '../../layout/BackButton-BqujYLNY.js';
import messageListSo from '../../stores/message/list-Bj7w0DpV.js';
import MessageReceiverSelector from './MessageReceiverSelector-DSH6x9Tu.js';
import Typography from '../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Add from '../../node_modules/@mui/icons-material/esm/Add-wuZCSiqb.js';
import { useSearchParams } from '../../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

const MessageHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleNewMessageClick = () => {
    messageListSo.createAndSelect();
  };
  const handleReceiverChange = (receiverId2) => {
    const params2 = Object.fromEntries(searchParams.entries());
    if (!receiverId2) {
      delete params2.receiver;
      setSearchParams(params2);
      return;
    }
    setSearchParams({ ...params2, receiver: receiverId2 });
  };
  const handleUpdateClick = () => {
    messageListSo.fetch();
  };
  const params = Object.fromEntries(searchParams.entries());
  const receiverId = params.receiver ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "h5", children: "MESSAGES" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { flex: 1 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MessageReceiverSelector,
      {
        receiverId,
        onChange: handleReceiverChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "contained",
        startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Add, {}),
        onClick: handleUpdateClick,
        children: "UPDATE"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "contained",
        startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Add, {}),
        onClick: handleNewMessageClick,
        children: "NEW"
      }
    )
  ] });
};

export { MessageHeader as default };
//# sourceMappingURL=MessageHeader-BmDrnA9_.js.map
