import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import React from '../../../node_modules/react/index-D4xv3bQx.js';
import CommentRow from './CommentRow-DSQLo0Yp.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Divider from '../../../node_modules/@mui/material/esm/Divider/Divider-CRCPK7ea.js';

const CommentsList = ({
  comments,
  onClick
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { display: "flex", flexDirection: "column", gap: 2 }, children: comments.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentRow,
      {
        comment,
        onClick
      }
    ),
    index < comments.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {})
  ] }, comment.id)) });
};

export { CommentsList as default };
//# sourceMappingURL=CommentsList-SS9Q24yI.js.map
