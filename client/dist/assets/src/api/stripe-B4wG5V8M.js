import ajax from '../plugins/AjaxService-oFOrX7Jo.js';

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
//# sourceMappingURL=stripe-B4wG5V8M.js.map
