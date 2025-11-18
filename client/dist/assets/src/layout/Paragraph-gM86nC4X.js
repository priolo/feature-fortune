import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';

const Paragraph = ({
  title,
  subtitle,
  sx,
  sxLabel,
  children
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: [sxRoot, sx], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: [sxLabelRoot, sxLabel], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxTitle, children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxSubtitle, children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxRootChildren, children })
  ] });
};
const sxRoot = {
  display: "flex",
  alignItems: "center"
};
const sxLabelRoot = {
  flex: 0.15,
  display: "flex",
  flexDirection: "column",
  paddingRight: "15px"
};
const sxTitle = {
  fontWeight: 500,
  fontSize: 14,
  opacity: 0.8
};
const sxSubtitle = {
  mt: "-4px",
  mb: "-10px",
  fontSize: 11,
  fontWeight: 300,
  opacity: 0.5
};
const sxRootChildren = {
  display: "flex",
  flex: 1
};

export { Paragraph as default };
//# sourceMappingURL=Paragraph-gM86nC4X.js.map
