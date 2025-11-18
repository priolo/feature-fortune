import { j as jsxRuntimeExports } from '../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import IconButton from '../node_modules/@mui/material/esm/IconButton/IconButton-VKzCU0qt.js';
import ArrowBack from '../node_modules/@mui/icons-material/esm/ArrowBack-Cxrh-nGk.js';
import { useNavigate } from '../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

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

export { BackButton as default };
//# sourceMappingURL=BackButton-BqujYLNY.js.map
