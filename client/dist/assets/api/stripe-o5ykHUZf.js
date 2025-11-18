import ajax from '../plugins/AjaxService-B27u9Z3Z.js';

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

export { stripeApi as default };
//# sourceMappingURL=stripe-o5ykHUZf.js.map
