import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import Card from "../../../components/Card-DL78qpae.js";
import MessageBanner from "../../../components/MessageBanner-Clbvx_ZE.js";
import Framework from "../../../layout/Framework-CKUq8ahJ.js";
import featureListSo from "../../../stores/feature/list-D9UX_evA.js";
import locationSo, { LOCATION_PAGE } from "../../../stores/location/index-D4KyfQ78.js";
import { useStore as yn } from "../../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import { r as reactExports } from "../../../_virtual/index-B7JGm7Mw.js";
import FeatureView from "./FeatureView-Ct8MjCJp.js";
import { filterByAccount, filterByStatus, filterByText, sort } from "../../../stores/feature/utils-DwmyDldF.js";
import authSo from "../../../stores/auth/repo-DlXMor6z.js";
import List from "../../../node_modules/@mui/material/esm/List/List-EbspPVNA.js";
import ListItemButton from "../../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-Nfyp42ot.js";
import { useNavigate, useSearchParams } from "../../../node_modules/react-router/dist/development/chunk-4WY6JWTD-Dd9vUgbO.js";
const FeatureListPag = () => {
  yn(featureListSo);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  reactExports.useEffect(() => {
    locationSo.setCurrent(LOCATION_PAGE.FeaturesList);
    featureListSo.fetch();
  }, []);
  const features = reactExports.useMemo(() => {
    var _a;
    const params = Object.fromEntries(searchParams.entries());
    let features2 = featureListSo.state.all ?? [];
    features2 = filterByAccount(features2, params.filter, (_a = authSo.state.user) == null ? void 0 : _a.id);
    features2 = filterByStatus(features2, params.status);
    features2 = filterByText(features2, params.search);
    features2 = sort(features2, params.sort);
    return features2;
  }, [searchParams, featureListSo.state.all]);
  const handleFeatureClick = (id) => {
    navigate(`/app/feature/${id}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Framework, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { id: "feature-list-card", sx: { mt: 3 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(List, { children: [
    features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ListItemButton,
      {
        divider: index < features.length - 1,
        onClick: () => handleFeatureClick(feature.id),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FeatureView,
          {
            feature
          }
        )
      },
      feature.id
    )),
    features.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: "No features found. Create your first feature to get started!" })
  ] }) }) });
};
export {
  FeatureListPag as default
};
//# sourceMappingURL=ListPag-DhVivIkl.js.map
