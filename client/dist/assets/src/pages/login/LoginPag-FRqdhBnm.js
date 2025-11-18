import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import authSo from '../../stores/auth/repo-DDYwtmFN.js';
import { useStore as yn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import EmailLoginCard from '../../components/email/EmailLoginCard-BlAdpnuE.js';
import GoogleLoginCard from '../../components/google/GoogleLoginCard-C6YSqWJJ.js';
import GithubLoginCard from '../../components/github/GithubLoginCard-BIms5sLW.js';
import locationSo, { LOCATION_PAGE } from '../../stores/location/index-ChdRpV7e.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import { useNavigate } from '../../../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

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

export { LoginPag as default };
//# sourceMappingURL=LoginPag-FRqdhBnm.js.map
