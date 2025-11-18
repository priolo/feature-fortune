import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import Avatar from "../node_modules/@mui/material/esm/Avatar/Avatar-_FVrP-oe.js";
import InfoOutlined from "../node_modules/@mui/icons-material/esm/InfoOutlined-0Q7XeFdN.js";
const AvatarCmp = ({
  account,
  sx
}) => {
  var _a;
  if (!account) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { sx: [{ bgcolor: "primary.main" }, sx], children: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoOutlined, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Avatar,
    {
      sx,
      src: account.avatarUrl,
      alt: account.name,
      children: !account.avatarUrl && ((_a = account.name) == null ? void 0 : _a.charAt(0).toUpperCase())
    }
  );
};
export {
  AvatarCmp as default
};
//# sourceMappingURL=AvatarCmp-Ban6I1Lf.js.map
