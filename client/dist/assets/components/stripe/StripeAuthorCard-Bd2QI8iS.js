import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import stripeApi from "../../api/stripe-_TQaUbHg.js";
import Card from "../Card-BYT7Mzxb.js";
import authSo from "../../stores/auth/repo-BpuRYfKE.js";
import ManageAccountsIcon from "../../node_modules/@mui/icons-material/esm/ManageAccounts-Do6ApRAj.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import Typography from "../../node_modules/@mui/material/esm/Typography/Typography-D4fK_9nY.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import Button from "../../node_modules/@mui/material/esm/Button/Button-BVH5MggO.js";
const StripeAuthorCard = () => {
  var _a, _b;
  yn(authSo);
  const handleRegister = async () => {
    var _a2, _b2;
    if (!((_a2 = authSo.state.user) == null ? void 0 : _a2.email) && !((_b2 = authSo.state.user) == null ? void 0 : _b2.googleEmail)) {
      alert("Devi prima collegare una email (Google o Github)");
      return;
    }
    const res = await stripeApi.registerLink();
    if (!res.url) return alert("Errore durante la registrazione a Stripe");
    window.location.href = res.url;
  };
  const handleDetach = async () => {
    await stripeApi.unregister();
    authSo.setUser({
      ...authSo.state.user,
      stripeAccountId: null,
      stripeAccountStatus: null
    });
  };
  const handleStripeDashboard = () => {
    var _a2, _b2;
    if (!((_a2 = authSo.state.user) == null ? void 0 : _a2.stripeAccountId)) return alert("Errore: account Stripe non trovato");
    const url = `https://dashboard.stripe.com/${(_b2 = authSo.state.user) == null ? void 0 : _b2.stripeAccountId}/home`;
    window.open(url, "_blank");
  };
  const haveStripeAuthor = !!((_a = authSo.state.user) == null ? void 0 : _a.stripeAccountId);
  const accountReady = ((_b = authSo.state.user) == null ? void 0 : _b.stripeAccountStatus) == "ready";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      id: "stripe-author-card",
      title: "Stripe author access",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ManageAccountsIcon, { color: "primary" }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: haveStripeAuthor ? "Sei registrato come autore su Stripe." : "Registrati come autore Stripe per iniziare a ricevere pagamenti." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { sx: sxActions, children: [
          haveStripeAuthor && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleDetach, children: "DETACH" }),
          haveStripeAuthor && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleRegister, children: accountReady ? "MODIFY" : "COMPLETE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleStripeDashboard, children: "STRIPE DASHBOARD" })
          ] }),
          !haveStripeAuthor && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleRegister, children: "REGISTER" })
        ] })
      ]
    }
  );
};
const sxActions = {
  display: "flex",
  justifyContent: "end",
  paddingTop: 1
};
export {
  StripeAuthorCard as default
};
//# sourceMappingURL=StripeAuthorCard-Bd2QI8iS.js.map
