import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import Box from "../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Typography from "../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
import InfoOutlined from "../node_modules/@mui/icons-material/esm/InfoOutlined-0Q7XeFdN.js";
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
export {
  MessageBanner as default
};
//# sourceMappingURL=MessageBanner-B4TvhSX-.js.map
