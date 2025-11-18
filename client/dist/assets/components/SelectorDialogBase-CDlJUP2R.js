import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import React from "../_virtual/index-CKgvjd_4.js";
import MessageBanner from "./MessageBanner-B4TvhSX-.js";
import Dialog from "../node_modules/@mui/material/esm/Dialog/Dialog-CGmKSS7p.js";
import DialogTitle from "../node_modules/@mui/material/esm/DialogTitle/DialogTitle-BYHfSoPn.js";
import TextField from "../node_modules/@mui/material/esm/TextField/TextField-YzDg_6yu.js";
import DialogContent from "../node_modules/@mui/material/esm/DialogContent/DialogContent-RxK1Hotu.js";
import List from "../node_modules/@mui/material/esm/List/List-B0BooIe5.js";
import ListItem from "../node_modules/@mui/material/esm/ListItem/ListItem-DACBzrJf.js";
import ListItemButton from "../node_modules/@mui/material/esm/ListItemButton/ListItemButton-4XAy6lAX.js";
import ListItemText from "../node_modules/@mui/material/esm/ListItemText/ListItemText-C1wj9SVj.js";
import DialogActions from "../node_modules/@mui/material/esm/DialogActions/DialogActions-BQrKJAbM.js";
import Button from "../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
const SelectorDialogBase = ({
  title,
  isOpen,
  idSelect,
  items,
  filterText,
  onFilterTextChange,
  onClose,
  fnTextFromItem = (item) => item,
  fnSecondaryFromItem,
  fnIdFromItem = (item) => item
}) => {
  const handleClose = (reason) => {
    onClose == null ? void 0 : onClose(null);
  };
  const handleItemClick = (item) => {
    onClose == null ? void 0 : onClose(item);
  };
  const handleFilterChange = (event) => {
    onFilterTextChange == null ? void 0 : onFilterTextChange(event.target.value);
  };
  const filteredItems = React.useMemo(() => {
    if (!items || !items.length) return [];
    if (!filterText || filterText.trim() === "") return items;
    const lowercaseFilter = filterText.toLowerCase();
    return items.filter((item) => {
      const text = fnTextFromItem ? fnTextFromItem(item) : "";
      const secondaryText = fnSecondaryFromItem ? fnSecondaryFromItem(item) : "";
      const textStr = typeof text === "string" ? text : (text == null ? void 0 : text.toString()) || "";
      const secondaryStr = typeof secondaryText === "string" ? secondaryText : (secondaryText == null ? void 0 : secondaryText.toString()) || "";
      return textStr.toLowerCase().includes(lowercaseFilter) || secondaryStr.toLowerCase().includes(lowercaseFilter);
    });
  }, [items, filterText, fnTextFromItem, fnSecondaryFromItem]);
  const haveItems = filteredItems.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { onClose: handleClose, open: isOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: title }),
    onFilterTextChange && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextField,
      {
        sx: { px: 3, py: 0 },
        value: filterText || "",
        onChange: handleFilterChange,
        placeholder: "Type to filter items..."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { children: haveItems ? /* @__PURE__ */ jsxRuntimeExports.jsx(List, { children: filteredItems.map(
      (item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListItem, { disablePadding: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ListItemButton,
        {
          onClick: () => handleItemClick(item),
          selected: idSelect != null && fnIdFromItem(item) === idSelect,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListItemText,
            {
              primary: fnTextFromItem(item),
              secondary: (fnSecondaryFromItem == null ? void 0 : fnSecondaryFromItem(item)) ?? void 0
            }
          )
        }
      ) }, fnIdFromItem(item))
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: "no items" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => handleClose(),
        children: "Close"
      }
    ) })
  ] });
};
export {
  SelectorDialogBase as default
};
//# sourceMappingURL=SelectorDialogBase-CDlJUP2R.js.map
