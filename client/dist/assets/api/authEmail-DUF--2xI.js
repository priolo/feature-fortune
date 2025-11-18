import ajax from '../plugins/AjaxService-B27u9Z3Z.js';

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
//# sourceMappingURL=authEmail-DUF--2xI.js.map
