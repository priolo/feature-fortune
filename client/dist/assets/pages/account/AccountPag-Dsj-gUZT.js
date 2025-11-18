import { j as jsxRuntimeExports } from "../../_virtual/jsx-runtime-CocFHxF7.js";
import Framework from "../../layout/Framework-xovDwbrU.js";
import authSo, { stripePromise } from "../../stores/auth/repo-BpuRYfKE.js";
import locationSo, { LOCATION_PAGE } from "../../stores/location/index-CWD3Tsyk.js";
import { useStore as yn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
import { Elements } from "../../node_modules/@stripe/react-stripe-js/dist/react-stripe.esm-C9QpMAFV.js";
import { r as reactExports } from "../../_virtual/index-CKgvjd_4.js";
import EmailLoginCard from "../../components/email/EmailLoginCard-CJ3Sj_p6.js";
import GithubLoginCard from "../../components/github/GithubLoginCard-KsNAUrUl.js";
import GoogleLoginCard from "../../components/google/GoogleLoginCard-Dn9UoYy7.js";
import StripeAuthorCard from "../../components/stripe/StripeAuthorCard-Bd2QI8iS.js";
import StripeCreditCard from "../../components/stripe/StripeCreditCard-BRUgq8sq.js";
import SettingsCard from "./SettingsCard-C01GsxU8.js";
import Box from "../../node_modules/@mui/material/esm/Box/Box-DyZPUH46.js";
import List from "../../node_modules/@mui/material/esm/List/List-B0BooIe5.js";
import ListItemButton from "../../node_modules/@mui/material/esm/ListItemButton/ListItemButton-4XAy6lAX.js";
import ListItemText from "../../node_modules/@mui/material/esm/ListItemText/ListItemText-C1wj9SVj.js";
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
export {
  AccountPag as default
};
//# sourceMappingURL=AccountPag-Dsj-gUZT.js.map
