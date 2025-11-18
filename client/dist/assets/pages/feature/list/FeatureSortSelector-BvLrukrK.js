import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-CocFHxF7.js";
import SelectorDialogBase from "../../../components/SelectorDialogBase-CDlJUP2R.js";
import { FEATURE_SORT } from "../../../stores/feature/types-TK7-yYif.js";
import React from "../../../_virtual/index-CKgvjd_4.js";
import Chip from "../../../node_modules/@mui/material/esm/Chip/Chip-CIGG8gt9.js";
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
        idSelect: selected == null ? void 0 : selected.id,
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
export {
  FeatureSortSelector as default
};
//# sourceMappingURL=FeatureSortSelector-BvLrukrK.js.map
