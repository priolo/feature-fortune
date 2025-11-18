import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Card from '../../../components/Card-C-f_ZHMt.js';
import MessageBanner from '../../../components/MessageBanner-DET9uRoX.js';
import Framework from '../../../layout/Framework-CCFwq8Vm.js';
import featureListSo from '../../../stores/feature/list-BmAoU7t6.js';
import locationSo, { LOCATION_PAGE } from '../../../stores/location/index-3g9xZMzJ.js';
import { useStore as yn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import FeatureView from './FeatureView-CA7aszt0.js';
import { filterByAccount, filterByStatus, filterByText, sort } from '../../../stores/feature/utils-B7aQkixX.js';
import authSo from '../../../stores/auth/repo-gcvx48OU.js';
import List from '../../../node_modules/@mui/material/esm/List/List-Cn7hm2Lr.js';
import ListItemButton from '../../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-tVm35zHB.js';
import { useNavigate, useSearchParams } from '../../../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

const FeatureListPag = () => {
  yn(featureListSo);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  reactExports.useEffect(() => {
    locationSo.setCurrent(LOCATION_PAGE.FeaturesList);
    featureListSo.fetch();
  }, []);
  const features = reactExports.useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    let features2 = featureListSo.state.all ?? [];
    features2 = filterByAccount(features2, params.filter, authSo.state.user?.id);
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

export { FeatureListPag as default };
//# sourceMappingURL=ListPag-D8Hr92eP.js.map
