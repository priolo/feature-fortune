import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import TextField from '../../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';
import Typography from '../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';

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
        ...readOnlyTypographyProps?.sx
      },
      children: content
    }
  );
};

export { ReadOnlyTextField as default };
//# sourceMappingURL=ReadOnlyTextField-BqWD33B2.js.map
