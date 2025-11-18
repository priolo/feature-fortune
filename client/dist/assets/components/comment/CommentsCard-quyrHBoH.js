import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import CommentDialog from './CommentDialog-BxauYplH.js';
import commentListSo from '../../stores/comment/list-Dy-8cFsz.js';
import { useStore as yn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import Card from '../Card-C-f_ZHMt.js';
import MessageBanner from '../MessageBanner-DET9uRoX.js';
import CommentsList from './CommentsList-S0TkBVTz.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Add from '../../node_modules/@mui/icons-material/esm/Add-wuZCSiqb.js';
import CommentBank from '../../node_modules/@mui/icons-material/esm/CommentBank-C0JdfWsp.js';

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

export { CommentsCard as default };
//# sourceMappingURL=CommentsCard-quyrHBoH.js.map
