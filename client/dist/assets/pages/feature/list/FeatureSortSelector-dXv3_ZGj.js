import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import SelectorDialogBase from '../../../components/SelectorDialogBase-CIeare7X.js';
import { FEATURE_SORT } from '../../../stores/feature/types-B8oOCTaO.js';
import React from '../../../node_modules/react/index-D4xv3bQx.js';
import Chip from '../../../node_modules/@mui/material/esm/Chip/Chip-CN5I0e23.js';

const FeatureSortSelector = ({
  sortId,
  onChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClose = (sort) => {
    if (!!sort) onChange(sort.id);
    setIsOpen(false);
  };
  const selected = featureSort.find((f) => f.id === sortId) ?? featureSort[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Chip,
      {
        label: selected.label,
        onClick: () => setIsOpen(true),
        onDelete: selected.id != FEATURE_SORT.RECENT ? () => onChange(null) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectorDialogBase,
      {
        title: "SORT FEATURES BY...",
        idSelect: selected?.id,
        items: featureSort,
        fnTextFromItem: (item) => item.label,
        fnIdFromItem: (item) => item.id,
        isOpen,
        onClose: handleClose
      }
    )
  ] });
};
const featureSort = [
  { id: FEATURE_SORT.RECENT, label: "RECENT" },
  { id: FEATURE_SORT.OLDEST, label: "OLDER" },
  { id: FEATURE_SORT.RICHEST, label: "RICHEST" },
  { id: FEATURE_SORT.POOREST, label: "POOREST" }
];

export { FeatureSortSelector as default };
//# sourceMappingURL=FeatureSortSelector-dXv3_ZGj.js.map
