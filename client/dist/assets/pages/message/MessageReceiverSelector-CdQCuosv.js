import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import SelectorDialogBase from "../../components/SelectorDialogBase-DXjEKzbA.js";
import messageListSo from "../../stores/message/list-CBlJowBF.js";
import { getAllSenders } from "../../stores/message/utils-Hln6INvg.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import React from "../../_virtual/index-B7JGm7Mw.js";
import Chip from "../../node_modules/@mui/material/esm/Chip/Chip-CUZhAhf1.js";
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
//# sourceMappingURL=MessageReceiverSelector-CdQCuosv.js.map
