import { j as jsxRuntimeExports } from "../_virtual/jsx-runtime-_Kx_2wye.js";
import IconButton from "../node_modules/@mui/material/esm/IconButton/IconButton-Di2_t52h.js";
import ArrowBack from "../node_modules/@mui/icons-material/esm/ArrowBack-D7JoTuyI.js";
import { useNavigate } from "../node_modules/react-router/dist/development/chunk-4WY6JWTD-Dd9vUgbO.js";
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
//# sourceMappingURL=BackButton-Cuaeat4X.js.map
