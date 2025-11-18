import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import { FUNDING_STATUS } from '../../types/Funding-dHhWNkJ5.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import PlayArrow from '../../node_modules/@mui/icons-material/esm/PlayArrow-zKa7zw93.js';
import CloseIcon from '../../node_modules/@mui/icons-material/esm/Close-ByUqLdPj.js';
import PointOfSale from '../../node_modules/@mui/icons-material/esm/PointOfSale-CvQhL8zH.js';
import Done from '../../node_modules/@mui/icons-material/esm/Done-CyT5F92y.js';
import Tooltip from '../../node_modules/@mui/material/esm/Tooltip/Tooltip-DnxfmlZG.js';
import Chip from '../../node_modules/@mui/material/esm/Chip/Chip-CN5I0e23.js';

const StatusChip = ({
  status,
  onClick
}) => {
  const item = reactExports.useMemo(() => FundingStatusItems.find((i) => i.value === status), [status]);
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

export { FundingStatusItems, StatusChip as default };
//# sourceMappingURL=StatusChip-B9P0lOwW.js.map
