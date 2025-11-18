import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Avatar from '../../node_modules/@mui/material/esm/Avatar/Avatar-Fp6XlwQN.js';
import InfoOutlined from '../../node_modules/@mui/icons-material/esm/InfoOutlined-DEk-TK4x.js';

const AvatarCmp = ({
  account,
  sx
}) => {
  if (!account) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { sx: [{ bgcolor: "primary.main" }, sx], children: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoOutlined, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Avatar,
    {
      sx,
      src: account.avatarUrl,
      alt: account.name,
      children: !account.avatarUrl && account.name?.charAt(0).toUpperCase()
    }
  );
};

export { AvatarCmp as default };
//# sourceMappingURL=AvatarCmp-SyzdOpfe.js.map
