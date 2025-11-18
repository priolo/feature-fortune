import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import { FEATURE_STATUS } from "../../../types/feature/Feature-D_3DuBCH.js";
import { r as reactExports } from "../../../_virtual/index-B7JGm7Mw.js";
import DesignServices from "../../../node_modules/@mui/icons-material/esm/DesignServices-hBD6nA_g.js";
import Build from "../../../node_modules/@mui/icons-material/esm/Build-5ujFkFcl.js";
import WaterDrop from "../../../node_modules/@mui/icons-material/esm/WaterDrop-Cx8_LQgZ.js";
import Done from "../../../node_modules/@mui/icons-material/esm/Done-Ci9nN64U.js";
import CloseIcon from "../../../node_modules/@mui/icons-material/esm/Close-BzxsT9HO.js";
import Tooltip from "../../../node_modules/@mui/material/esm/Tooltip/Tooltip-BQsfAXpX.js";
import Chip from "../../../node_modules/@mui/material/esm/Chip/Chip-CUZhAhf1.js";
const FeatureStatusChip = ({
  status,
  onClick
}) => {
  var _a;
  const item = reactExports.useMemo(() => FeatureStatusItems.find((i) => i.value === status), [status]);
  const label = ((_a = item == null ? void 0 : item.label) == null ? void 0 : _a.toUpperCase()) ?? "N/A";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: (item == null ? void 0 : item.subtitle) ?? "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Chip,
    {
      icon: item == null ? void 0 : item.icon,
      label,
      color: (item == null ? void 0 : item.color) || "default",
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
export {
  FeatureStatusItems,
  FeatureStatusChip as default
};
//# sourceMappingURL=StatusChip-CgMFCg50.js.map
