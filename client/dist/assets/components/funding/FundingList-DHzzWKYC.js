import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import FundingView from "./FundingView-YffCrLfa.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import List from "../../node_modules/@mui/material/esm/List/List-B0BooIe5.js";
import ListItemButton from "../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-4XAy6lAX.js";
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
//# sourceMappingURL=FundingList-DHzzWKYC.js.map
