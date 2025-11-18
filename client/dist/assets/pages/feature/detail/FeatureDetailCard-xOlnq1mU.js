import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-CocFHxF7.js";
import Card from "../../../components/Card-BYT7Mzxb.js";
import Paragraph from "../../../layout/Paragraph-BpFNKXri.js";
import React from "../../../_virtual/index-CKgvjd_4.js";
import ReadOnlyTextField from "../../../components/ReadOnlyTextField-DTtzz8HK.js";
import FeaturedPlayList from "../../../node_modules/@mui/icons-material/esm/FeaturedPlayList-CBpxkQDP.js";
const FeatureDetailCard = ({
  feature,
  readOnly,
  onChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const handlePropChange = (prop) => {
    onChange == null ? void 0 : onChange({ ...feature, ...prop });
  };
  const title = (feature == null ? void 0 : feature.title) ?? "";
  const description = (feature == null ? void 0 : feature.description) ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      title: "DETAIL",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedPlayList, {}),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paragraph, { title: "TITLE", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReadOnlyTextField,
          {
            fullWidth: true,
            readOnly,
            value: title,
            onChange: (e) => handlePropChange({ title: e.target.value }),
            placeholder: "Enter a short title for the feature"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paragraph, { title: "DESCRIPTION", sx: { alignItems: "start" }, sxLabel: { mt: ".7rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReadOnlyTextField,
          {
            fullWidth: true,
            multiline: true,
            rows: 6,
            readOnly,
            value: description,
            onChange: (e) => handlePropChange({ description: e.target.value }),
            placeholder: "Enter a complete description of the feature..."
          }
        ) })
      ]
    }
  );
};
export {
  FeatureDetailCard as default
};
//# sourceMappingURL=FeatureDetailCard-xOlnq1mU.js.map
