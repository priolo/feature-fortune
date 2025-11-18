import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-_Kx_2wye.js";
import Card from "../../../components/Card-DL78qpae.js";
import FundingDialog from "../../../components/funding/FundingDialog-Dghk77Sz.js";
import FundingList from "../../../components/funding/FundingList-Cw24O_tb.js";
import MessageBanner from "../../../components/MessageBanner-Clbvx_ZE.js";
import fundingListSo from "../../../stores/funding/list-CZKAPf8D.js";
import { useStore as yn } from "../../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import { r as reactExports } from "../../../_virtual/index-B7JGm7Mw.js";
import Button from "../../../node_modules/@mui/material/esm/Button/Button-DnJzZ-4Z.js";
import Add from "../../../node_modules/@mui/icons-material/esm/Add-uMJzXXPe.js";
import Payment from "../../../node_modules/@mui/icons-material/esm/Payment-Bjyqrkdo.js";
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
export {
  FundingsCard as default
};
//# sourceMappingURL=FundingsCard-BsVyJJK_.js.map
