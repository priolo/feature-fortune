import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import authSo from "../../stores/auth/repo-DlXMor6z.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import { r as reactExports } from "../../_virtual/index-B7JGm7Mw.js";
import EmailLoginCard from "../../components/email/EmailLoginCard-Di3aAcVD.js";
import GoogleLoginCard from "../../components/google/GoogleLoginCard-BUCV_2Er.js";
import GithubLoginCard from "../../components/github/GithubLoginCard-6CqcS_yF.js";
import locationSo, { LOCATION_PAGE } from "../../stores/location/index-D4KyfQ78.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import { useNavigate } from "../../node_modules/react-router/dist/development/chunk-4WY6JWTD-Dd9vUgbO.js";
const LoginPag = ({}) => {
  yn(authSo);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!!authSo.state.user) {
      navigate("/app/");
      return;
    }
    locationSo.setCurrent(LOCATION_PAGE.Login);
  }, [authSo.state.user]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxRoot, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmailLoginCard, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleLoginCard, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GithubLoginCard, {})
  ] });
};
const sxRoot = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  //alignItems: 'center',
  maxWidth: 800,
  margin: "0 auto",
  padding: 2
};
export {
  LoginPag as default
};
//# sourceMappingURL=LoginPag-CMwE2938.js.map
