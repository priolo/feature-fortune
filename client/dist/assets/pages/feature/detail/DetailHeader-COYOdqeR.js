import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import authSo from '../../../stores/auth/repo-gcvx48OU.js';
import featureDetailSo from '../../../stores/feature/detail-BTgOX7nk.js';
import BackButton from '../../../layout/BackButton-BqujYLNY.js';
import { useStore as yn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import dialogSo, { DIALOG_TYPE } from '../../../stores/layout/dialogStore-BFo7mydR.js';
import FeatureStatusChip from './StatusChip-B4qlWVlM.js';
import { FEATURE_STATUS, FEATURE_ACTIONS } from '../../../types/feature/Feature-CBISZiEK.js';
import Typography from '../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import { useNavigate } from '../../../node_modules/react-router/dist/development/chunk-4WY6JWTD-CDRuxkyo.js';

const FeatureDetailHeader = () => {
  yn(featureDetailSo);
  const navigate = useNavigate();
  const handleAuthorSaveClick = async () => {
    await featureDetailSo.save();
    dialogSo.dialogOpen({
      title: "Success",
      text: "Feature saved successfully",
      type: DIALOG_TYPE.SUCCESS,
      modal: false
    });
  };
  const handleAuthorCancelClick = async () => {
    const res = await dialogSo.dialogOpen({
      title: "ATTENZIONE",
      text: `Tutti i FUNDERS verranno annullati e Il DEVELOPER non verrà pagato.
Questa FEATURE verrà chiusa definitivamente e non sarà modificabile.`,
      type: DIALOG_TYPE.WARNING,
      modal: true
    });
    if (!res) return;
    await featureDetailSo.action(FEATURE_ACTIONS.ATH_CANCEL);
    dialogSo.dialogOpen({
      title: "Success",
      text: "Feature cancelled successfully",
      type: DIALOG_TYPE.SUCCESS,
      modal: false
    });
  };
  const handleAuthorCompleteClick = async () => {
    const res = await dialogSo.dialogOpen({
      title: "ATTENZIONE",
      text: `Dichiari che la FEATURE è completata. 
Quindi tra 24 ore i pagamenti al DEVELOPER verranno effettuati automaticamente.`,
      type: DIALOG_TYPE.WARNING,
      modal: true
    });
    if (!res) return;
    await featureDetailSo.action(FEATURE_ACTIONS.ATH_COMPLETE);
    dialogSo.dialogOpen({
      title: "Success",
      text: "Feature completed successfully",
      type: DIALOG_TYPE.SUCCESS,
      modal: false
    });
  };
  const handleDevAcceptClick = async () => {
    const res = await dialogSo.dialogOpen({
      title: "Please wait",
      text: "Accepting the feature...",
      type: DIALOG_TYPE.INFO,
      modal: true
    });
    console.log("RES", res);
    await featureDetailSo.action(FEATURE_ACTIONS.DEV_ACCEPT);
    dialogSo.dialogOpen({
      title: "Success",
      text: "Feature accepted successfully",
      type: DIALOG_TYPE.SUCCESS,
      modal: false
    });
  };
  const handleDevDeclineClick = async () => {
    await dialogSo.dialogOpen({
      title: "ATTENZIONE",
      text: `Stai rifiutando la FEATURE.`,
      labelCancel: "ANNULLA",
      type: DIALOG_TYPE.WARNING,
      modal: true
    });
    await featureDetailSo.action(FEATURE_ACTIONS.DEV_DECLINE);
    dialogSo.dialogOpen({
      title: "Success",
      text: "Feature declined successfully",
      type: DIALOG_TYPE.SUCCESS,
      modal: false
    });
  };
  const handleDevLeaveClick = async () => {
    const res = await dialogSo.dialogOpen({
      title: "ATTENZIONE",
      text: `Stai abbandonado la FEATURE. 
Verrai rimosso come DEVELOPER e la FEATURE tornerà in stato PROPOSED.`,
      labelCancel: "ANNULLA",
      type: DIALOG_TYPE.WARNING,
      modal: true
    });
    if (!res) return;
    await featureDetailSo.action(FEATURE_ACTIONS.DEV_LEAVE);
    dialogSo.dialogOpen({
      title: "Success",
      text: "You have left the feature successfully",
      type: DIALOG_TYPE.SUCCESS,
      modal: false
    });
  };
  const handleDevReleaseClick = async () => {
    const res = await dialogSo.dialogOpen({
      title: "ATTENZIONE",
      text: `Dopo il rilascio, l'AUTHOR dovrà accettare o rifiutare
Se verrà accettata dopo 24 ore avverrà il pagamento.`,
      labelCancel: "ANNULLA",
      type: DIALOG_TYPE.WARNING,
      modal: true
    });
    if (!res) return;
    await featureDetailSo.action(FEATURE_ACTIONS.DEV_RELEASE);
    dialogSo.dialogOpen({
      title: "Success",
      text: "Feature released successfully",
      type: DIALOG_TYPE.SUCCESS,
      modal: false
    });
  };
  const handleCancelClick = () => {
    navigate(-1);
  };
  const feature = featureDetailSo.state.feature;
  const featureLoaded = featureDetailSo.state.featureLoaded;
  if (!feature) return null;
  const logged = !!authSo.state.user;
  const isNew = !feature?.id;
  const isAuthor = logged && (isNew || feature?.accountId == authSo.state.user?.id);
  const isDeveloper = logged && (featureLoaded?.accountDevId == authSo.state.user?.id || featureLoaded?.accountDevId == null && featureLoaded?.githubDevId == authSo.state.user?.githubId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "h5", children: "FEATURE" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeatureStatusChip,
      {
        status: feature?.status
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { flex: 1 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleCancelClick,
        children: "BACK"
      }
    ),
    isAuthor && feature.status == FEATURE_STATUS.PROPOSED && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "contained",
        color: "primary",
        onClick: handleAuthorSaveClick,
        children: isNew ? "CREATE" : "MODIFY"
      }
    ),
    isAuthor && feature.status == FEATURE_STATUS.IN_DEVELOPMENT && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "contained",
        color: "error",
        onClick: handleAuthorCancelClick,
        children: "CANCEL"
      }
    ) }),
    isAuthor && feature.status == FEATURE_STATUS.RELEASED && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "contained",
          color: "error",
          onClick: handleAuthorCancelClick,
          children: "REJECT"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "contained",
          color: "success",
          onClick: handleAuthorCompleteClick,
          children: "SUCCESS!"
        }
      )
    ] }),
    isDeveloper && feature.status == FEATURE_STATUS.PROPOSED && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "contained",
          color: "primary",
          onClick: handleDevAcceptClick,
          children: "ACCEPT"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "contained",
          color: "primary",
          onClick: handleDevDeclineClick,
          children: "DECLINE"
        }
      )
    ] }),
    isDeveloper && feature.status == FEATURE_STATUS.IN_DEVELOPMENT && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "contained",
          color: "primary",
          onClick: handleDevLeaveClick,
          children: "LEAVE"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "contained",
          color: "success",
          onClick: handleDevReleaseClick,
          children: "RELEASE"
        }
      )
    ] })
  ] });
};

export { FeatureDetailHeader as default };
//# sourceMappingURL=DetailHeader-COYOdqeR.js.map
