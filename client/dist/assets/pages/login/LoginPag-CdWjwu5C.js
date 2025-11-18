import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import authSo from "../../stores/auth/repo-BpuRYfKE.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import EmailLoginCard from "../../components/email/EmailLoginCard-CJ3Sj_p6.js";
import GoogleLoginCard from "../../components/google/GoogleLoginCard-Dn9UoYy7.js";
import GithubLoginCard from "../../components/github/GithubLoginCard-KsNAUrUl.js";
import locationSo, { LOCATION_PAGE } from "../../stores/location/index-CWD3Tsyk.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import { useNavigate } from "../../node_modules/react-router/dist/development/chunk-4WY6JWTD-B2TdbP9T.js";
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
//# sourceMappingURL=LoginPag-CdWjwu5C.js.map
