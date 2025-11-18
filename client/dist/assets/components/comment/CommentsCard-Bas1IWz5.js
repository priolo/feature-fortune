import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import CommentDialog from "./CommentDialog-BtZVkOlb.js";
import commentListSo from "../../stores/comment/list-CTs-eWTn.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import Card from "../Card-BYT7Mzxb.js";
import MessageBanner from "../MessageBanner-B4TvhSX-.js";
import CommentsList from "./CommentsList-W_cV1Zyx.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
import Add from "../../node_modules/@mui/icons-material/esm/Add-B0PcbgOi.js";
import CommentBank from "../../node_modules/@mui/icons-material/esm/CommentBank-BCl8oQ4E.js";
const CommentsCard = ({
  featureId
}) => {
  yn(commentListSo);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!featureId) {
      commentListSo.setAll(null);
      return;
    }
    commentListSo.fetch({ featureId });
  }, [featureId]);
  const handleCommentClick = () => {
    setDialogOpen(true);
  };
  const handleCommentDialogClose = (comment) => {
    setDialogOpen(false);
    if (!comment) return;
    comment.entityType = "feature";
    comment.entityId = featureId;
    commentListSo.setSelected(comment);
    commentListSo.saveSelected();
  };
  const comments = commentListSo.state.all;
  if (!comments) return null;
  const isVoid = comments.length == 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        id: "comment-list-card",
        title: "COMMENTS",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentBank, {}),
        titleEndRender: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "contained",
            size: "small",
            startIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Add, {}),
            onClick: handleCommentClick,
            children: "ADD"
          }
        ),
        children: !isVoid ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommentsList,
          {
            comments
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBanner, { children: "No comments yet for this feature." })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentDialog,
      {
        isOpen: dialogOpen,
        onClose: handleCommentDialogClose
      }
    )
  ] });
};
export {
  CommentsCard as default
};
//# sourceMappingURL=CommentsCard-Bas1IWz5.js.map
