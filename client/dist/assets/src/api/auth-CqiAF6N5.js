import ajax from '../plugins/AjaxService-oFOrX7Jo.js';

function current(opt) {
  return ajax.get(`auth/current`, { ...opt, isLogin: true });
}
function logout(opt) {
  return ajax.post(`auth/logout`, null, opt);
}
function githubLoginUrl(opt) {
  return ajax.get(`auth/github/login`, opt);
}
function githubAttachUrl(opt) {
  return ajax.get(`github/link`, opt);
}
function githubDetach(opt) {
  return ajax.delete(`github`, opt);
}
function githubGetAccount(accountId, opt) {
  return ajax.get(`accounts/github/${accountId}`, opt);
}
function loginGoogle(token, opt) {
  return ajax.post(`auth/google/login`, { token }, { ...opt, isLogin: true });
}
function googleAttach(token, opt) {
  return ajax.post(`google`, { token }, opt);
}
function googleDetach(opt) {
  return ajax.delete(`google`, opt);
}
const authApi = {
  current,
  logout,
  githubGetAccount,
  githubLoginUrl,
  githubAttachUrl,
  githubDetach,
  loginGoogle,
  googleAttach,
  googleDetach
};

export { authApi as default };
//# sourceMappingURL=auth-CqiAF6N5.js.map
