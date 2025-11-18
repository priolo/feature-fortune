import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-_Kx_2wye.js";
import Avatar from "../node_modules/@mui/material/esm/Avatar/Avatar-BfdFkWnt.js";
import InfoOutlined from "../node_modules/@mui/icons-material/esm/InfoOutlined-C1nRmCB8.js";
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
//# sourceMappingURL=AvatarCmp-CQaTe6Gh.js.map
