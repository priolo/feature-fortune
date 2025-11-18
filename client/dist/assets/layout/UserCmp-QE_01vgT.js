import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import authSo from "../stores/auth/repo-BpuRYfKE.js";
import { useStore as yn } from "../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import { r as reactExports } from "../_virtual/index-CKgvjd_4.js";
import Button from "../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
import Box from "../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Typography from "../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
import Menu from "../node_modules/@mui/material/esm/Menu/Menu-CKbzyv7x.js";
import MenuItem from "../node_modules/@mui/material/esm/MenuItem/MenuItem-D5x-4M2j.js";
import { useNavigate } from "../node_modules/react-router/dist/development/chunk-4WY6JWTD-B2TdbP9T.js";
const UserCmp = ({}) => {
  yn(authSo);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    authSo.current();
  }, []);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = reactExports.useState(null);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  const handleLoginClick = (event) => {
    navigate("/app/login");
  };
  const handleUserClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
  const handleAccount = async () => {
    navigate("/app/account");
    handleUserMenuClose();
  };
  const handleLogout = async () => {
    await authSo.logout();
    handleUserMenuClose();
  };
  if (!authSo.state.user) return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      onClick: handleLoginClick,
      children: "LOGIN"
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Box,
      {
        sx: sxUser,
        onClick: handleUserClick,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "h6", className: "user-avatar", children: authSo.state.user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", className: "user-name", children: authSo.state.user.email })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Menu,
      {
        anchorEl: userMenuAnchorEl,
        open: userMenuOpen,
        onClose: handleUserMenuClose,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { onClick: handleAccount, children: "ACCOUNT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { onClick: handleLogout, children: "LOGOUT" })
        ]
      }
    )
  ] });
};
const sxUser = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  alignItems: "center",
  cursor: "pointer",
  padding: 1,
  borderRadius: 1,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)"
  }
};
export {
  UserCmp as default
};
//# sourceMappingURL=UserCmp-QE_01vgT.js.map
