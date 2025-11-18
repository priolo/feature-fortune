import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import React from '../node_modules/react/index-D4xv3bQx.js';
import MessageBanner from './MessageBanner-DET9uRoX.js';
import Dialog from '../node_modules/@mui/material/esm/Dialog/Dialog-DnBhiBv0.js';
import DialogTitle from '../node_modules/@mui/material/esm/DialogTitle/DialogTitle-HCfi_f08.js';
import TextField from '../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import DialogContent from '../node_modules/@mui/material/esm/DialogContent/DialogContent-CXvC-oj7.js';
import List from '../node_modules/@mui/material/esm/List/List-Cn7hm2Lr.js';
import ListItem from '../node_modules/@mui/material/esm/ListItem/ListItem-Dh_gUZ-4.js';
import ListItemButton from '../node_modules/@mui/material/esm/ListItemButton/ListItemButton-tVm35zHB.js';
import ListItemText from '../node_modules/@mui/material/esm/ListItemText/ListItemText-CfsVfgtK.js';
import DialogActions from '../node_modules/@mui/material/esm/DialogActions/DialogActions-C4kVUFW5.js';
import Button from '../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';

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
    onClose?.(null);
  };
  const handleItemClick = (item) => {
    onClose?.(item);
  };
  const handleFilterChange = (event) => {
    onFilterTextChange?.(event.target.value);
  };
  const filteredItems = React.useMemo(() => {
    if (!items || !items.length) return [];
    if (!filterText || filterText.trim() === "") return items;
    const lowercaseFilter = filterText.toLowerCase();
    return items.filter((item) => {
      const text = fnTextFromItem ? fnTextFromItem(item) : "";
      const secondaryText = fnSecondaryFromItem ? fnSecondaryFromItem(item) : "";
      const textStr = typeof text === "string" ? text : text?.toString() || "";
      const secondaryStr = typeof secondaryText === "string" ? secondaryText : secondaryText?.toString() || "";
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
              secondary: fnSecondaryFromItem?.(item) ?? void 0
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

export { SelectorDialogBase as default };
//# sourceMappingURL=SelectorDialogBase-CIeare7X.js.map
