import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import FundingView from "./FundingView-j-V26pdu.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import List from "../../node_modules/@mui/material/esm/List/List-EbspPVNA.js";
import ListItemButton from "../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-Nfyp42ot.js";
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
export {
  FundingList as default
};
//# sourceMappingURL=FundingList-Cw24O_tb.js.map
