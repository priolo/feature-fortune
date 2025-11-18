import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import TextField from "../node_modules/@mui/material/esm/TextField/TextField-YzDg_6yu.js";
import Typography from "../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
const defaultReadOnlySx = { p: "8.5px 14px" };
const ReadOnlyTextField = (props) => {
  const {
    readOnly,
    value,
    placeholder,
    readOnlyPlaceholder,
    readOnlyTypographyProps,
    ...textFieldProps
  } = props;
  if (!readOnly) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextField,
      {
        ...textFieldProps,
        value,
        placeholder
      }
    );
  }
  const resolvedValue = Array.isArray(value) ? value.join(", ") : value;
  const stringified = resolvedValue === void 0 || resolvedValue === null ? "" : String(resolvedValue);
  const fallback = readOnlyPlaceholder ?? placeholder ?? "";
  const content = stringified !== "" ? resolvedValue : fallback;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Typography,
    {
      variant: "body1",
      ...readOnlyTypographyProps,
      sx: {
        ...defaultReadOnlySx,
        ...readOnlyTypographyProps == null ? void 0 : readOnlyTypographyProps.sx
      },
      children: content
    }
  );
};
export {
  ReadOnlyTextField as default
};
//# sourceMappingURL=ReadOnlyTextField-DTtzz8HK.js.map
