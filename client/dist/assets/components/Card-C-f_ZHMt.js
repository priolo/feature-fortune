import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import { r as reactExports } from '../node_modules/react/index-D4xv3bQx.js';
import Paper from '../node_modules/@mui/material/esm/Paper/Paper-91yl6fdr.js';
import Box from '../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Typography from '../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import IconButton from '../node_modules/@mui/material/esm/IconButton/IconButton-VKzCU0qt.js';
import ExpandLess from '../node_modules/@mui/icons-material/esm/ExpandLess-7UzROoLZ.js';
import ExpandMore from '../node_modules/@mui/icons-material/esm/ExpandMore-DVWRLJpj.js';
import Collapse from '../node_modules/@mui/material/esm/Collapse/Collapse-SJXqL_Kb.js';

const Card = ({
  id,
  title,
  icon,
  collapsible = false,
  defaultExpanded = true,
  titleEndRender,
  children,
  sx
}) => {
  const [expanded, setExpanded] = reactExports.useState(defaultExpanded);
  const handleToggle = () => {
    if (!collapsible) return;
    setExpanded(!expanded);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { id, sx: [sxPaper, sx], children: [
    !!title && /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxTitleBox, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxTitle, children: [
        icon,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "h6", children: title })
      ] }),
      titleEndRender,
      collapsible && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { size: "small", onClick: handleToggle, children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandLess, { fontSize: "small" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandMore, { fontSize: "small" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Collapse, { in: !collapsible || expanded, unmountOnExit: collapsible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxContent, children }) })
  ] });
};
const sxActionCard = {
  display: "flex",
  justifyContent: "end",
  gap: 1
};
const sxPaper = {
  borderRadius: 3,
  px: 3,
  py: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2
};
const sxTitleBox = {
  position: "sticky",
  top: 0,
  backgroundColor: "#292929",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  gap: 2
};
const sxTitle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: 1.5
};
const sxContent = {
  display: "flex",
  flexDirection: "column",
  gap: 1
};

export { Card as default, sxActionCard };
//# sourceMappingURL=Card-C-f_ZHMt.js.map
