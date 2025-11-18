import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import { FEATURE_STATUS } from '../../../types/feature/Feature-CBISZiEK.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import DesignServices from '../../../node_modules/@mui/icons-material/esm/DesignServices-DCbv-UYF.js';
import Build from '../../../node_modules/@mui/icons-material/esm/Build-DoCW4MU6.js';
import WaterDrop from '../../../node_modules/@mui/icons-material/esm/WaterDrop-Zv_WGEvC.js';
import Done from '../../../node_modules/@mui/icons-material/esm/Done-CyT5F92y.js';
import CloseIcon from '../../../node_modules/@mui/icons-material/esm/Close-ByUqLdPj.js';
import Tooltip from '../../../node_modules/@mui/material/esm/Tooltip/Tooltip-DnxfmlZG.js';
import Chip from '../../../node_modules/@mui/material/esm/Chip/Chip-CN5I0e23.js';

const FeatureStatusChip = ({
  status,
  onClick
}) => {
  const item = reactExports.useMemo(() => FeatureStatusItems.find((i) => i.value === status), [status]);
  const label = item?.label?.toUpperCase() ?? "N/A";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: item?.subtitle ?? "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Chip,
    {
      icon: item?.icon,
      label,
      color: item?.color || "default",
      onClick
    }
  ) });
};
const FeatureStatusItems = [
  {
    label: "Proposed",
    value: FEATURE_STATUS.PROPOSED,
    subtitle: "Feature has been proposed from AUTHOR",
    color: "default",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DesignServices, {})
  },
  {
    label: "In Development",
    value: FEATURE_STATUS.IN_DEVELOPMENT,
    subtitle: "Feature accepted by an DEVELOPER and is in progress",
    color: "secondary",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Build, {})
  },
  {
    label: "Released",
    value: FEATURE_STATUS.RELEASED,
    subtitle: "DEVELOPER declares the feature COMPLETED",
    color: "primary",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WaterDrop, {})
  },
  {
    label: "Completed",
    value: FEATURE_STATUS.COMPLETED,
    subtitle: "AUTHOOR confirms the feature is SUCCESSFUL",
    color: "success",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Done, {})
  },
  {
    label: "Cancelled",
    value: FEATURE_STATUS.CANCELLED,
    subtitle: "AUTHOR or DEVELOPER has CANCELLED the feature",
    color: "error",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {})
  }
];

export { FeatureStatusItems, FeatureStatusChip as default };
//# sourceMappingURL=StatusChip-B4qlWVlM.js.map
