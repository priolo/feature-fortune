import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import Framework from '../../layout/Framework-CCFwq8Vm.js';
import authSo, { stripePromise } from '../../stores/auth/repo-gcvx48OU.js';
import locationSo, { LOCATION_PAGE } from '../../stores/location/index-3g9xZMzJ.js';
import { useStore as yn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { Elements } from '../../node_modules/@stripe/react-stripe-js/dist/react-stripe.esm-l8LxLKbG.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import EmailLoginCard from '../../components/email/EmailLoginCard-DKuIOfKH.js';
import GithubLoginCard from '../../components/github/GithubLoginCard-DjD0IFO7.js';
import GoogleLoginCard from '../../components/google/GoogleLoginCard-C09giEbH.js';
import StripeAuthorCard from '../../components/stripe/StripeAuthorCard-Cstb-2aQ.js';
import StripeCreditCard from '../../components/stripe/StripeCreditCard-vj0gXzO6.js';
import SettingsCard from './SettingsCard-DuPKGISI.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import List from '../../node_modules/@mui/material/esm/List/List-Cn7hm2Lr.js';
import ListItemButton from '../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-tVm35zHB.js';
import ListItemText from '../../node_modules/@mui/material/esm/ListItemText/ListItemText-CfsVfgtK.js';

const AccountPag = ({}) => {
  yn(authSo);
  reactExports.useEffect(() => {
    locationSo.setCurrent(LOCATION_PAGE.Account);
  }, []);
  const scrollToCard = (cardId) => {
    const element = document.getElementById(cardId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  if (!authSo.state.user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }, children: "NULL" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Framework,
    {
      sx: { py: 2 },
      leftRender: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: { position: "sticky", top: 20, pt: 2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(List, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => scrollToCard("email-login-card"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "Email" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => scrollToCard("google-login-card"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "Google" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => scrollToCard("github-login-card"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "GitHub" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => scrollToCard("stripe-credit-card"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "Credit Card" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => scrollToCard("stripe-author-card"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "Stripe Author" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemButton, { onClick: () => scrollToCard("settings-card"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListItemText, { primary: "Settings" }) })
      ] }) }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsCard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EmailLoginCard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleLoginCard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GithubLoginCard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Elements, { stripe: stripePromise, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StripeCreditCard, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StripeAuthorCard, {})
      ]
    }
  );
};

export { AccountPag as default };
//# sourceMappingURL=AccountPag-jU7eCRlw.js.map
