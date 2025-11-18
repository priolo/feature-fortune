import { j as jsxRuntimeExports } from '../../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import SelectorDialogBase from '../../../components/SelectorDialogBase-CS1rFYbZ.js';
import { FeatureStatusItems } from '../detail/StatusChip-Be7rCW_2.js';
import React from '../../../../node_modules/react/index-D4xv3bQx.js';
import Chip from '../../../../node_modules/@mui/material/esm/Chip/Chip-CN5I0e23.js';

const FeatureStatusSelector = ({
  statusId,
  onChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selected = React.useMemo(() => FeatureStatusItems.find((item) => item.value === statusId), [statusId]);
  const handleClose = (status) => {
    if (!!status) onChange(status.value);
    setIsOpen(false);
  };
  const label = selected?.label?.toUpperCase() ?? "ALL STATUSES";
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
        idSelect: selected?.value ?? void 0,
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

export { FeatureStatusSelector as default };
//# sourceMappingURL=FeatureStatusSelector-CYouZzS4.js.map
