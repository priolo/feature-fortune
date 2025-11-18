import ajax from "../plugins/AjaxService-Bqrj80ie.js";
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
export {
  authEmailApi as default
};
//# sourceMappingURL=authEmail-xE6qOOrC.js.map
