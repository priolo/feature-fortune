import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-_Kx_2wye.js";
import React from "../../_virtual/index-B7JGm7Mw.js";
import CommentRow from "./CommentRow-CEenqwm0.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DPhGMc79.js";
import Divider from "../../node_modules/@mui/material/esm/Divider/Divider-C72kh98C.js";
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
export {
  CommentsList as default
};
//# sourceMappingURL=CommentsList-BxgkgNd0.js.map
