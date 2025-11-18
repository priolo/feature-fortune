import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Card from '../../../components/Card-C-f_ZHMt.js';
import FundingDialog from '../../../components/funding/FundingDialog-B9wIVAXj.js';
import FundingList from '../../../components/funding/FundingList-j0W6V9zv.js';
import MessageBanner from '../../../components/MessageBanner-DET9uRoX.js';
import fundingListSo from '../../../stores/funding/list-C5l-pKwZ.js';
import { useStore as yn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { r as reactExports } from '../../../node_modules/react/index-D4xv3bQx.js';
import Button from '../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Add from '../../../node_modules/@mui/icons-material/esm/Add-wuZCSiqb.js';
import Payment from '../../../node_modules/@mui/icons-material/esm/Payment-Crhs_2dx.js';

const FundingsCard = ({
  featureId,
  readonly = false
}) => {
  yn(fundingListSo);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!featureId) {
      fundingListSo.setAll(null);
      return;
    }
    fundingListSo.fetch({ featureId });
  }, [featureId]);
  const handleCreateClick = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = (funding) => {
    setDialogOpen(false);
    if (!funding) return;
    funding.featureId = featureId;
    fundingListSo.setSelected(funding);
    fundingListSo.saveSelected();
  };
  const fundings = fundingListSo.state.all;
  if (!fundings) return null;
  const isVoid = fundings.length == 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        id: "funding-card",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Payment, {}),
        title: "FUNDINGS",
        titleEndRender: !readonly && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "contained",
            size: "small",
            startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Add, {}),
            onClick: handleCreateClick,
            children: "CONTRIBUTE"
          }
        ),
        children: !isVoid ? /* @__PURE__ */ jsxRuntimeExports.jsx(FundingList, { fundings }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: "No fundings yet for this feature." })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FundingDialog,
      {
        isOpen: dialogOpen,
        onClose: handleDialogClose
      }
    )
  ] });
};

export { FundingsCard as default };
//# sourceMappingURL=FundingsCard-hjEGMV_8.js.map
