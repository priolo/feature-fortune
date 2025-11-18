import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-CocFHxF7.js";
import IconButton from "../node_modules/@mui/material/esm/IconButton/IconButton-Bbkc8NX8.js";
import ArrowBack from "../node_modules/@mui/icons-material/esm/ArrowBack-C-RCxzBt.js";
import { useNavigate } from "../node_modules/react-router/dist/development/chunk-4WY6JWTD-B2TdbP9T.js";
const BackButton = ({
  toHome = false
}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    if (toHome) {
      navigate("/app");
    } else if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/app");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IconButton,
    {
      onClick: handleGoBack,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowBack, {}),
        " "
      ]
    }
  );
};
export {
  BackButton as default
};
//# sourceMappingURL=BackButton-pSFWkQ3V.js.map
