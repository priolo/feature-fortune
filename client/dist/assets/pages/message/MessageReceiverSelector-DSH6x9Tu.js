import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import SelectorDialogBase from '../../components/SelectorDialogBase-CIeare7X.js';
import messageListSo from '../../stores/message/list-Bj7w0DpV.js';
import { getAllSenders } from '../../stores/message/utils-CgioDnah.js';
import { useStore as yn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import React from '../../node_modules/react/index-D4xv3bQx.js';
import Chip from '../../node_modules/@mui/material/esm/Chip/Chip-CN5I0e23.js';

const AccountSystem = {
  id: "sys",
  name: "SYSTEM",
  email: ""
};
const MessageReceiverSelector = ({
  receiverId,
  onChange
}) => {
  yn(messageListSo);
  const [isOpen, setIsOpen] = React.useState(false);
  const receivers = React.useMemo(() => {
    if (!messageListSo.state.all) return [];
    const accounts = getAllSenders(messageListSo.state.all);
    return [AccountSystem, ...accounts];
  }, [messageListSo.state.all]);
  const selected = receivers.find((account) => account.id === receiverId);
  const chipLabel = selected?.name ?? "ALL RECEIVERS";
  const handleClose = (account) => {
    setIsOpen(false);
    onChange(account?.id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Chip,
      {
        label: chipLabel,
        onClick: () => setIsOpen(true),
        onDelete: selected ? () => onChange(null) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectorDialogBase,
      {
        title: "FILTER BY RECEIVER",
        idSelect: selected?.id ?? void 0,
        items: receivers,
        fnTextFromItem: (account) => account.name,
        fnIdFromItem: (account) => account.id,
        isOpen,
        onClose: handleClose
      }
    )
  ] });
};

export { MessageReceiverSelector as default };
//# sourceMappingURL=MessageReceiverSelector-DSH6x9Tu.js.map
