import { j as jsxRuntimeExports } from '../../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import accountApi from '../../../api/account-DyUSFbE_.js';
import AccountSelectorCard from '../../../components/account/AccountSelectorCard-E78aTore.js';
import CommentsCard from '../../../components/comment/CommentsCard-xrqxLjtS.js';
import Framework from '../../../layout/Framework-x67HaMQT.js';
import FeatureDetailCard from './FeatureDetailCard-CefFdNd3.js';
import FundingsCard from './FundingsCard-CDT8Tkzg.js';
import featureDetailSo from '../../../stores/feature/detail-31j8h-86.js';
import locationSo, { LOCATION_PAGE } from '../../../stores/location/index-ChdRpV7e.js';
import { buildNewFeature } from '../../../types/feature/factory-C1u__lsT.js';
import { FEATURE_STATUS } from '../../../types/feature/Feature-CBISZiEK.js';
import { useStore as yn } from '../../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { r as reactExports } from '../../../../node_modules/react/index-D4xv3bQx.js';
import GithubRepoSelectorCard from '../../../components/github/repos/GithubRepoSelectorCard-DOhUzNBK.js';
import GithubUserSelectorCard from '../../../components/github/users/GithubUserSelectorCard-dq2ZaJob.js';
import authSo from '../../../stores/auth/repo-DDYwtmFN.js';
import { useParams } from '../../../../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';
import HistoryEdu from '../../../../node_modules/@mui/icons-material/esm/HistoryEdu-CPYPW0Z4.js';

const FeatureDetailPag = ({}) => {
  yn(featureDetailSo);
  let { id } = useParams();
  reactExports.useEffect(() => {
    locationSo.setCurrent(LOCATION_PAGE.FeatureDetail);
    if (id === "new" || !id) {
      featureDetailSo.setFeature(buildNewFeature());
      return;
    }
    const load = async () => {
      featureDetailSo.setFeature({ id });
      await featureDetailSo.fetch();
    };
    load();
  }, [id]);
  reactExports.useEffect(() => {
    return () => {
      featureDetailSo.setFeature(null);
    };
  }, []);
  const handleDetailChange = (feature2) => {
    featureDetailSo.setFeature(feature2);
  };
  const handleGithubRepoChange = async (repo) => {
    featureDetailSo.setFeature({
      ...featureDetailSo.state.feature,
      githubRepoId: repo?.id ?? null,
      githubRepoMetadata: repo ? {
        name: repo.name,
        full_name: repo.full_name,
        avatar_url: repo.owner.avatar_url,
        description: repo.description,
        html_url: repo.html_url
      } : null
    });
    if (!!repo.owner && !feature.githubDevId) {
      handleGithubDevChange(repo.owner);
    }
  };
  const handleGithubDevChange = async (githubDev) => {
    featureDetailSo.setFeature({
      ...featureDetailSo.state.feature,
      githubDevId: githubDev?.id ?? null
    });
    if (featureDetailSo.state.feature?.accountDevId) return;
    const res = await accountApi.getByGithubUserId(githubDev?.id);
    handleAccountDevChange(res.account);
  };
  const handleAccountDevChange = async (account) => {
    featureDetailSo.setFeature({
      ...featureDetailSo.state.feature,
      accountDevId: account?.id ?? null
    });
  };
  const feature = featureDetailSo.state.feature;
  if (!feature) return null;
  const logged = !!authSo.state.user;
  const isNew = !feature.id;
  const authorId = isNew ? authSo.state.user?.id : feature.accountId;
  const isAuthor = logged && (isNew || feature?.accountId == authSo.state.user?.id);
  const isFundable = feature?.status != FEATURE_STATUS.CANCELLED && feature?.status != FEATURE_STATUS.COMPLETED;
  const canAuthorEdit = isAuthor && feature.status == FEATURE_STATUS.PROPOSED;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Framework, { sx: { py: 2 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccountSelectorCard,
      {
        readOnly: true,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryEdu, {}),
        title: "AUTHOR",
        accountId: authorId
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GithubRepoSelectorCard,
      {
        readOnly: !canAuthorEdit,
        githubRepoId: feature.githubRepoId,
        onChange: handleGithubRepoChange
      }
    ),
    feature.status == FEATURE_STATUS.PROPOSED && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GithubUserSelectorCard,
      {
        readOnly: !canAuthorEdit,
        githubOwnerId: feature.githubDevId,
        onChange: handleGithubDevChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccountSelectorCard,
      {
        readOnly: !canAuthorEdit,
        title: "DEVELOPER",
        message: !feature.accountDevId ? "Select the account that will be used to open issues and pull requests on GitHub." : null,
        accountId: feature.accountDevId,
        onChange: handleAccountDevChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeatureDetailCard,
      {
        readOnly: !canAuthorEdit,
        feature,
        onChange: handleDetailChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FundingsCard,
      {
        readonly: !isFundable,
        featureId: feature.id
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentsCard,
      {
        featureId: feature.id
      }
    )
  ] });
};

export { FeatureDetailPag as default };
//# sourceMappingURL=DetailPag-DW4SZuHL.js.map
