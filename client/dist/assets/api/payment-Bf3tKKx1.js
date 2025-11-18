import ajax from "../plugins/AjaxService-j9sgKia1.js";
function create(opt) {
  return ajax.post(`payments`, null, opt);
}
function saveCard(paymentMethodId, opt) {
  return ajax.post(
    `payments/card`,
    { paymentMethodId },
    opt
  );
}
function remove(opt) {
  return ajax.delete(`payments`, null, opt);
}
function get(opt) {
  return ajax.get(`payments`, opt);
}
const paymentApi = {
  create,
  saveCard,
  remove,
  get
};
export {
  paymentApi as default
};
//# sourceMappingURL=payment-Bf3tKKx1.js.map
