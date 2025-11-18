import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import React from "../../_virtual/index-CKgvjd_4.js";
import CommentRow from "./CommentRow-CWIGcdPc.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Divider from "../../node_modules/@mui/material/esm/Divider/Divider-DB1hsD_O.js";
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
//# sourceMappingURL=CommentsList-W_cV1Zyx.js.map
