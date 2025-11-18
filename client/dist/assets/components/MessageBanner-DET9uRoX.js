import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Box from '../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Typography from '../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import InfoOutlined from '../node_modules/@mui/icons-material/esm/InfoOutlined-DEk-TK4x.js';

const MessageBanner = ({
  icon = /* @__PURE__ */ jsxRuntimeExports.jsx(InfoOutlined, { color: "action" }),
  children
}) => {
  if (!children) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { display: "flex", alignItems: "center" }, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children })
  ] });
};
const sxRoot = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  padding: 2,
  color: "text.secondary"
};

export { MessageBanner as default };
//# sourceMappingURL=MessageBanner-DET9uRoX.js.map
