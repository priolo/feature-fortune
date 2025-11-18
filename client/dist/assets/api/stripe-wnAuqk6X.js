import ajax from "../plugins/AjaxService-Bqrj80ie.js";
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
//# sourceMappingURL=stripe-wnAuqk6X.js.map
