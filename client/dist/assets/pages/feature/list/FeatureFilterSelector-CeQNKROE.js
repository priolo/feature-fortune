import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import SelectorDialogBase from '../../../components/SelectorDialogBase-CIeare7X.js';
import { FEATURE_FILTER } from '../../../stores/feature/types-B8oOCTaO.js';
import React from '../../../node_modules/react/index-D4xv3bQx.js';
import Chip from '../../../node_modules/@mui/material/esm/Chip/Chip-CN5I0e23.js';

const FeatureFilterSelector = ({
  filterId,
  onChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClose = (filter) => {
    if (!!filter) onChange(filter.id);
    setIsOpen(false);
  };
  const selected = featureFiltes.find((f) => f.id === filterId) ?? featureFiltes[0];
  const isDefault = selected.id == featureFiltes[0].id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Chip,
      {
        label: selected.label,
        onClick: () => setIsOpen(true),
        onDelete: !isDefault ? () => onChange(null) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectorDialogBase,
      {
        title: "FILTER FEATURES",
        idSelect: selected?.id,
        items: featureFiltes,
        fnTextFromItem: (item) => item.label,
        fnIdFromItem: (item) => item.id,
        isOpen,
        onClose: handleClose
      }
    )
  ] });
};
const featureFiltes = [
  { id: FEATURE_FILTER.ALL, label: "ALL" },
  { id: FEATURE_FILTER.FINANCED, label: "I CONTRIBUTE" },
  { id: FEATURE_FILTER.MY, label: "I CREATED" },
  { id: FEATURE_FILTER.DEVELOPED, label: "I DEVELOP" }
];

export { FeatureFilterSelector as default };
//# sourceMappingURL=FeatureFilterSelector-CeQNKROE.js.map
