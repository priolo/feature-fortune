import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import authSo from "../../stores/auth/repo-DlXMor6z.js";
import Card, { sxActionCard } from "../Card-DL78qpae.js";
import GoogleIcon from "../../node_modules/@mui/icons-material/esm/Google-xWqzjIs-.js";
import { GoogleOAuthProvider, GoogleLogin } from "../../node_modules/@react-oauth/google/dist/index.esm-CAPTJ8MI.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-BN4TdCYf.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import Done from "../../node_modules/@mui/icons-material/esm/Done-Ci9nN64U.js";
const GoogleLoginCard = ({}) => {
  var _a;
  yn(authSo);
  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
    authSo.loginWithGoogle(response.credential);
  };
  const handleLoginFailure = () => {
    console.log("Login Failure:");
  };
  const handleGoogleDetach = async () => {
    authSo.detachGoogle();
  };
  const logged = !!authSo.state.user;
  const haveGoogle = !!((_a = authSo.state.user) == null ? void 0 : _a.googleEmail);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      id: "google-login-card",
      title: "Google access",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, { color: "primary" }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { logged, haveGoogle }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxActionCard, children: !!logged && haveGoogle ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleGoogleDetach,
            children: "Detach"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleOAuthProvider, { clientId: "545902107281-qgd4s1enct9mcq4qh3vpccn45uocdk9s.apps.googleusercontent.com", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          GoogleLogin,
          {
            onSuccess: handleLoginSuccess,
            onError: handleLoginFailure
          }
        ) }) })
      ]
    }
  );
};
const Message = ({
  logged,
  haveGoogle
}) => {
  if (haveGoogle) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Done, { color: "success", sx: { fontSize: "1.4em", verticalAlign: "text-bottom", mx: "2px" } }),
      "La tua email è verificata."
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Collega il tuo account Google per un accesso più rapido e sicuro." });
};
export {
  GoogleLoginCard as default
};
//# sourceMappingURL=GoogleLoginCard-BUCV_2Er.js.map
