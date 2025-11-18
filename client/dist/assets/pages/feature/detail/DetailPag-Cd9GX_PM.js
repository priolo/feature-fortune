import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import accountApi from "../../../api/account-BmJ7MWCd.js";
import AccountSelectorCard from "../../../components/account/AccountSelectorCard-PtKJcIu_.js";
import CommentsCard from "../../../components/comment/CommentsCard-x_lLGrAD.js";
import Framework from "../../../layout/Framework-CKUq8ahJ.js";
import FeatureDetailCard from "./FeatureDetailCard-CQ2ZCHp5.js";
import FundingsCard from "./FundingsCard-BsVyJJK_.js";
import featureDetailSo from "../../../stores/feature/detail-KnQIQZkT.js";
import locationSo, { LOCATION_PAGE } from "../../../stores/location/index-D4KyfQ78.js";
import { buildNewFeature } from "../../../types/feature/factory-cfOyeMST.js";
import { FEATURE_STATUS } from "../../../types/feature/Feature-D_3DuBCH.js";
import { useStore as yn } from "../../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import { r as reactExports } from "../../../_virtual/index-B7JGm7Mw.js";
import GithubRepoSelectorCard from "../../../components/github/repos/GithubRepoSelectorCard-BbnyUh4i.js";
import GithubUserSelectorCard from "../../../components/github/users/GithubUserSelectorCard-D8D68nNW.js";
import authSo from "../../../stores/auth/repo-DlXMor6z.js";
import { useParams } from "../../../node_modules/react-router/dist/development/chunk-4WY6JWTD-Dd9vUgbO.js";
import HistoryEdu from "../../../node_modules/@mui/icons-material/esm/HistoryEdu-C7clsBhK.js";
const FeatureDetailPag = ({}) => {
  var _a, _b;
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
      githubRepoId: (repo == null ? void 0 : repo.id) ?? null,
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
    var _a2;
    featureDetailSo.setFeature({
      ...featureDetailSo.state.feature,
      githubDevId: (githubDev == null ? void 0 : githubDev.id) ?? null
    });
    if ((_a2 = featureDetailSo.state.feature) == null ? void 0 : _a2.accountDevId) return;
    const res = await accountApi.getByGithubUserId(githubDev == null ? void 0 : githubDev.id);
    handleAccountDevChange(res.account);
  };
  const handleAccountDevChange = async (account) => {
    featureDetailSo.setFeature({
      ...featureDetailSo.state.feature,
      accountDevId: (account == null ? void 0 : account.id) ?? null
    });
  };
  const feature = featureDetailSo.state.feature;
  if (!feature) return null;
  const logged = !!authSo.state.user;
  const isNew = !feature.id;
  const authorId = isNew ? (_a = authSo.state.user) == null ? void 0 : _a.id : feature.accountId;
  const isAuthor = logged && (isNew || (feature == null ? void 0 : feature.accountId) == ((_b = authSo.state.user) == null ? void 0 : _b.id));
  const isFundable = (feature == null ? void 0 : feature.status) != FEATURE_STATUS.CANCELLED && (feature == null ? void 0 : feature.status) != FEATURE_STATUS.COMPLETED;
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
export {
  FeatureDetailPag as default
};
//# sourceMappingURL=DetailPag-Cd9GX_PM.js.map
