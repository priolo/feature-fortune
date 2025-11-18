import { j as jsxRuntimeExports } from "../../../_virtual/jsx-runtime-CocFHxF7.js";
import Card from "../../../components/Card-BYT7Mzxb.js";
import FundingDialog from "../../../components/funding/FundingDialog-SgOeoqsE.js";
import FundingList from "../../../components/funding/FundingList-DHzzWKYC.js";
import MessageBanner from "../../../components/MessageBanner-B4TvhSX-.js";
import fundingListSo from "../../../stores/funding/list-DgEMYxm4.js";
import { useStore as yn } from "../../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import { r as reactExports } from "../../../_virtual/index-CKgvjd_4.js";
import Button from "../../../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
import Add from "../../../node_modules/@mui/icons-material/esm/Add-B0PcbgOi.js";
import Payment from "../../../node_modules/@mui/icons-material/esm/Payment-BiYmnwP8.js";
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
//# sourceMappingURL=FundingsCard-CPiBwO6S.js.map
