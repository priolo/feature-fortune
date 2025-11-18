import ajax from "../plugins/AjaxService-j9sgKia1.js";
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
//# sourceMappingURL=authEmail-CwM2yjmB.js.map
