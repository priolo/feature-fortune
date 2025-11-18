import { j as jsxRuntimeExports } from '../../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import stripeApi from '../../api/stripe-B4wG5V8M.js';
import Card from '../Card-C8Zv_hyU.js';
import authSo from '../../stores/auth/repo-DDYwtmFN.js';
import ManageAccountsIcon from '../../../node_modules/@mui/icons-material/esm/ManageAccounts-CrFUY2fe.js';
import { useStore as yn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import Typography from '../../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Box from '../../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';

const StripeAuthorCard = () => {
  yn(authSo);
  const handleRegister = async () => {
    if (!authSo.state.user?.email && !authSo.state.user?.googleEmail) {
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
    if (!authSo.state.user?.stripeAccountId) return alert("Errore: account Stripe non trovato");
    const url = `https://dashboard.stripe.com/${authSo.state.user?.stripeAccountId}/home`;
    window.open(url, "_blank");
  };
  const haveStripeAuthor = !!authSo.state.user?.stripeAccountId;
  const accountReady = authSo.state.user?.stripeAccountStatus == "ready";
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

export { StripeAuthorCard as default };
//# sourceMappingURL=StripeAuthorCard-CcnEXE4P.js.map
