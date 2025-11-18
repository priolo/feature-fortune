import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import SelectorDialogBase from "../../components/SelectorDialogBase-CDlJUP2R.js";
import messageListSo from "../../stores/message/list-RfsD6ulD.js";
import { getAllSenders } from "../../stores/message/utils-Hln6INvg.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import React from "../../_virtual/index-CKgvjd_4.js";
import Chip from "../../node_modules/@mui/material/esm/Chip/Chip-CIGG8gt9.js";
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
  const chipLabel = (selected == null ? void 0 : selected.name) ?? "ALL RECEIVERS";
  const handleClose = (account) => {
    setIsOpen(false);
    onChange(account == null ? void 0 : account.id);
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
        idSelect: (selected == null ? void 0 : selected.id) ?? void 0,
        items: receivers,
        fnTextFromItem: (account) => account.name,
        fnIdFromItem: (account) => account.id,
        isOpen,
        onClose: handleClose
      }
    )
  ] });
};
export {
  MessageReceiverSelector as default
};
//# sourceMappingURL=MessageReceiverSelector-BCIRqvAa.js.map
