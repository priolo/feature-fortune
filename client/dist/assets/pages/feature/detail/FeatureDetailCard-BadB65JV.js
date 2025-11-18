import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Card from '../../../components/Card-C-f_ZHMt.js';
import Paragraph from '../../../layout/Paragraph-xFBbwgfJ.js';
import React from '../../../node_modules/react/index-D4xv3bQx.js';
import ReadOnlyTextField from '../../../components/ReadOnlyTextField-BVPW9_7X.js';
import FeaturedPlayList from '../../../node_modules/@mui/icons-material/esm/FeaturedPlayList--XQ0iX5l.js';

const FeatureDetailCard = ({
  feature,
  readOnly,
  onChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const handlePropChange = (prop) => {
    onChange?.({ ...feature, ...prop });
  };
  const title = feature?.title ?? "";
  const description = feature?.description ?? "";
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

export { FeatureDetailCard as default };
//# sourceMappingURL=FeatureDetailCard-BadB65JV.js.map
