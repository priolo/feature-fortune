import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import { r as reactExports } from "../_virtual/index-CKgvjd_4.js";
import Tooltip from "../node_modules/@mui/material/esm/Tooltip/Tooltip-BTwjbMfs.js";
import IconButton from "../node_modules/@mui/material/esm/IconButton/IconButton-Bbkc8NX8.js";
import MoreVertIcon from "../node_modules/@mui/icons-material/esm/MoreVert-BDUdnSjp.js";
import Menu from "../node_modules/@mui/material/esm/Menu/Menu-CKbzyv7x.js";
import Divider from "../node_modules/@mui/material/esm/Divider/Divider-DB1hsD_O.js";
import MenuItem from "../node_modules/@mui/material/esm/MenuItem/MenuItem-D5x-4M2j.js";
import ListItemIcon from "../node_modules/@mui/material/esm/ListItemIcon/ListItemIcon-ABcSKarF.js";
import Typography from "../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
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
//# sourceMappingURL=ActionsMenu-DWtoKZfg.js.map
