import { j as jsxRuntimeExports } from '../../node_modules/react/jsx-runtime-DRv_ZGNc.js';
import paymentApi from '../../api/payment-DJicM-q8.js';
import Card from '../Card-C-f_ZHMt.js';
import authSo from '../../stores/auth/repo-gcvx48OU.js';
import { useStore as yn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { useStripe, useElements, CardElement } from '../../node_modules/@stripe/react-stripe-js/dist/react-stripe.esm-l8LxLKbG.js';
import { r as reactExports } from '../../node_modules/react/index-D4xv3bQx.js';
import CreditCardViewer from './CreditCardViewer-Duyg7vhT.js';
import Typography from '../../node_modules/@mui/material/esm/Typography/Typography-11omLKTR.js';
import Box from '../../node_modules/@mui/material/esm/Box/Box-DTzBKIdF.js';
import Button from '../../node_modules/@mui/material/esm/Button/Button-BjQwoaO_.js';
import Money from '../../node_modules/@mui/icons-material/esm/Money-DsXnaPFp.js';

const StripeCreditCard = ({}) => {
  const havePaymentMethod = authSo.state.user?.stripeHaveCard;
  yn(authSo);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!havePaymentMethod) return;
    async function load() {
      const { paymentMethods } = await paymentApi.get();
      setPaymentMethod(paymentMethods);
    }
    load();
  }, [havePaymentMethod]);
  const handleSavePayMethodClick = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      alert("Errore: elemento carta non trovato.");
      return;
    }
    const resIntent = await paymentApi.create();
    if (!resIntent) return;
    const resCard = await stripe.confirmCardSetup(
      resIntent.clientSecret,
      {
        payment_method: {
          card: cardElement
        }
      }
    );
    if (resCard.error) {
      alert("Errore nella conferma della carta: " + resCard.error.message);
      return;
    }
    const stripePaymentMethodId = resCard.setupIntent.payment_method;
    const res = await paymentApi.saveCard(stripePaymentMethodId);
    if (res.success) {
      alert("Metodo di pagamento salvato! Sarai addebitato quando l'autore sarà pronto.");
      authSo.setUser({
        ...authSo.state.user,
        stripeHaveCard: true
      });
    } else {
      alert(resCard.error.message);
    }
  };
  const handleCCReset = async () => {
    const res = await paymentApi.remove();
    if (res.success) {
      alert("Metodo di pagamento rimosso.");
      authSo.setUser({
        ...authSo.state.user,
        stripeHaveCard: false
      });
      setPaymentMethod(null);
    } else {
      alert("Errore nella rimozione del metodo di pagamento.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      id: "stripe-credit-card",
      title: "Credit Card",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Money, { color: "primary" }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "body2", color: "text.secondary", children: !havePaymentMethod ? "Non hai ancora una carta di credito salvata." : "Hai una carta di credito salvata." }),
        !!havePaymentMethod ? /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCardViewer, { card: paymentMethod?.card }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CardElement, { className: "stripe-card-element" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { sx: sxActions, children: havePaymentMethod ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleCCReset,
            children: "DETACH"
          }
        ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSavePayMethodClick,
            children: "SET CARD"
          }
        ) }) })
      ]
    }
  );
};
const sxActions = {
  display: "flex",
  justifyContent: "end",
  paddingTop: 1
};

export { StripeCreditCard as default };
//# sourceMappingURL=StripeCreditCard-vj0gXzO6.js.map
