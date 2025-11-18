import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-_Kx_2wye.js";
import { r as reactExports } from "../_virtual/index-B7JGm7Mw.js";
import Tooltip from "../node_modules/@mui/material/esm/Tooltip/Tooltip-BQsfAXpX.js";
import IconButton from "../node_modules/@mui/material/esm/IconButton/IconButton-Di2_t52h.js";
import MoreVertIcon from "../node_modules/@mui/icons-material/esm/MoreVert-BfOOQR2l.js";
import Menu from "../node_modules/@mui/material/esm/Menu/Menu-BB6UbC6P.js";
import Divider from "../node_modules/@mui/material/esm/Divider/Divider-C72kh98C.js";
import MenuItem from "../node_modules/@mui/material/esm/MenuItem/MenuItem-nJ4nQcqC.js";
import ListItemIcon from "../node_modules/@mui/material/esm/ListItemIcon/ListItemIcon-DCWCJ7ZY.js";
import Typography from "../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
const ActionsMenu = ({
  actions,
  tooltip = "",
  disabled,
  sx
}) => {
  const [anchorEl, setAnchorEl] = reactExports.useState(null);
  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const handleClickAction = (e, action) => {
    var _a;
    e.stopPropagation();
    (_a = action.onClick) == null ? void 0 : _a.call(action, action);
    setAnchorEl(null);
  };
  if (!actions || actions.length == 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: tooltip, placement: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        sx,
        disabled,
        onClick: handleClick,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MoreVertIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Menu,
      {
        anchorEl,
        keepMounted: true,
        open: Boolean(anchorEl),
        onClose: handleClose,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        },
        children: actions.map((action, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ActionMenuItem,
          {
            action,
            onClick: handleClickAction
          },
          index
        ))
      }
    )
  ] });
};
const ActionMenuItem = ({
  action,
  onClick
}) => {
  if (action.hidden) return null;
  if (action.label == "---") return /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MenuItem,
    {
      onClick: (e) => onClick(e, action),
      children: [
        action.icon && /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemIcon, { children: action.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "caption", color: action.color, children: action.label })
      ]
    },
    action.label
  );
};
export {
  ActionsMenu as default
};
//# sourceMappingURL=ActionsMenu-7oF1XTDK.js.map
