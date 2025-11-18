import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import FundingView from './FundingView-Dfe7sn-O.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import List from '../../../node_modules/@mui/material/esm/List/List-Cn7hm2Lr.js';
import ListItemButton from '../../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-tVm35zHB.js';

const FundingList = ({
  fundings
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { display: "flex", flexDirection: "column", gap: 2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { children: fundings.map((funding, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ListItemButton,
    {
      divider: index < fundings.length - 1,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FundingView,
        {
          funding
        }
      )
    },
    funding.id
  )) }) });
};

export { FundingList as default };
//# sourceMappingURL=FundingList-rWnJnhgu.js.map
