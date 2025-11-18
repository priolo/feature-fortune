import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Box from '../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Select from '../node_modules/@mui/material/esm/Select/Select-0bwdIv9I.js';
import MenuItem from '../node_modules/@mui/material/esm/MenuItem/MenuItem-Dfle30b-.js';
import TextField from '../node_modules/@mui/material/esm/TextField/TextField-DglBZink.js';

const CurrencyField = ({
  value,
  currency = "USD",
  onChange,
  currencies = ["USD", "EUR", "GBP", "JPY"]
}) => {
  const handleValueChange = (e) => {
    const amount = parseInt(e.target.value) * 100;
    onChange?.(isNaN(amount) ? null : amount, currency);
  };
  const handleCurrencyChange = (e) => {
    const curr = e.target.value;
    onChange?.(value, curr);
  };
  const valueStr = value != null ? (value / 100).toFixed(0) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: { flex: 1, display: "flex", gap: 1 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        value: currency,
        onChange: handleCurrencyChange,
        children: currencies.map((curr) => /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { value: curr, children: curr }, curr))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextField,
      {
        fullWidth: true,
        type: "number",
        value: valueStr,
        onChange: handleValueChange
      }
    )
  ] });
};

export { CurrencyField as default };
//# sourceMappingURL=CurrencyField-lnUkAsen.js.map
