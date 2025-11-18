import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import SelectorDialogBase from "../../../components/SelectorDialogBase-DXjEKzbA.js";
import { FeatureStatusItems } from "../detail/StatusChip-CgMFCg50.js";
import React from "../../../_virtual/index-B7JGm7Mw.js";
import Chip from "../../../node_modules/@mui/material/esm/Chip/Chip-CUZhAhf1.js";
const FeatureStatusSelector = ({
  statusId,
  onChange
}) => {
  var _a;
  const [isOpen, setIsOpen] = React.useState(false);
  const selected = React.useMemo(() => FeatureStatusItems.find((item) => item.value === statusId), [statusId]);
  const handleClose = (status) => {
    if (!!status) onChange(status.value);
    setIsOpen(false);
  };
  const label = ((_a = selected == null ? void 0 : selected.label) == null ? void 0 : _a.toUpperCase()) ?? "ALL STATUSES";
  const isDefault = selected == null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Chip,
      {
        label,
        onClick: () => setIsOpen(true),
        onDelete: !isDefault ? () => onChange(null) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectorDialogBase,
      {
        title: "FILTER BY STATUS",
        idSelect: (selected == null ? void 0 : selected.value) ?? void 0,
        items: FeatureStatusItems,
        fnTextFromItem: (item) => item.label.toUpperCase(),
        fnSecondaryFromItem: (item) => item.subtitle,
        fnIdFromItem: (item) => item.value,
        isOpen,
        onClose: handleClose
      }
    )
  ] });
};
export {
  FeatureStatusSelector as default
};
//# sourceMappingURL=FeatureStatusSelector-CCYvOvBR.js.map
