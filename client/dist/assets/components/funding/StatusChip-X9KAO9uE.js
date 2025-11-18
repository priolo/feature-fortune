import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import { FUNDING_STATUS } from "../../types/Funding-B4L2sI4r.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import PlayArrow from "../../node_modules/@mui/icons-material/esm/PlayArrow-DjHacM38.js";
import CloseIcon from "../../node_modules/@mui/icons-material/esm/Close-BzxsT9HO.js";
import PointOfSale from "../../node_modules/@mui/icons-material/esm/PointOfSale-C5Y-q-Ee.js";
import Done from "../../node_modules/@mui/icons-material/esm/Done-Ci9nN64U.js";
import Tooltip from "../../node_modules/@mui/material/esm/Tooltip/Tooltip-BQsfAXpX.js";
import Chip from "../../node_modules/@mui/material/esm/Chip/Chip-CUZhAhf1.js";
const StatusChip = ({
  status,
  onClick
}) => {
  var _a;
  const item = reactExports.useMemo(() => FundingStatusItems.find((i) => i.value === status), [status]);
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
const FundingStatusItems = [
  {
    label: "Pending",
    value: FUNDING_STATUS.PENDING,
    subtitle: "Funding is pending approval",
    color: "default",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PlayArrow, {})
  },
  {
    label: "Cancelled",
    value: FUNDING_STATUS.CANCELLED,
    subtitle: "Funding has been cancelled",
    color: "error",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {})
  },
  {
    label: "Payable",
    value: FUNDING_STATUS.PAYABLE,
    subtitle: "Funding is ready to be paid",
    color: "primary",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PointOfSale, {})
  },
  {
    label: "Paied",
    value: FUNDING_STATUS.PAIED,
    subtitle: "Funding has been successfully paid",
    color: "success",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Done, {})
  },
  {
    label: "Error",
    value: FUNDING_STATUS.ERROR,
    subtitle: "Feature has been cancelled",
    color: "error",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {})
  }
];
export {
  FundingStatusItems,
  StatusChip as default
};
//# sourceMappingURL=StatusChip-X9KAO9uE.js.map
