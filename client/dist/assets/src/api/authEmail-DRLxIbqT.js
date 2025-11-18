import ajax from '../plugins/AjaxService-oFOrX7Jo.js';

function emailSendCode(email, opt) {
  return ajax.post(`auth/email_code`, { email }, opt);
}
function emailVerify(code, opt) {
  return ajax.post(`auth/email_verify`, { code }, opt);
}
const authEmailApi = {
  emailSendCode,
  emailVerify
};

export { authEmailApi as default };
//# sourceMappingURL=authEmail-DRLxIbqT.js.map
