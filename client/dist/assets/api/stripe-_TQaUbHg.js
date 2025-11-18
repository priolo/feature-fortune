import ajax from "../plugins/AjaxService-j9sgKia1.js";
function pay(fundingId, opt) {
  return ajax.post(`stripe/pay`, { fundingId }, opt);
}
function registerLink(opt) {
  return ajax.post(`stripe/register_link`, null, opt);
}
function unregister(opt) {
  return ajax.post(`stripe/unregister`, null, opt);
}
const stripeApi = {
  pay,
  registerLink,
  unregister
};
export {
  stripeApi as default
};
//# sourceMappingURL=stripe-_TQaUbHg.js.map
