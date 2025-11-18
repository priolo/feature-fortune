import ajax from '../plugins/AjaxService-oFOrX7Jo.js';

function index(filter, opt) {
  const params = new URLSearchParams();
  if (filter?.text) {
    params.append("text", filter.text);
  }
  const queryString = params.toString();
  const url = queryString ? `accounts?${queryString}` : "accounts";
  return ajax.get(url, opt);
}
async function get(id, opt) {
  if (!id) return;
  const user = await ajax.get(`accounts/${id}`, opt);
  return user;
}
async function getByGithubUserId(githubUserId, opt) {
  if (!githubUserId) return;
  const user = await ajax.get(`accounts/github/${githubUserId}`, opt);
  return user;
}
const accountApi = {
  index,
  get,
  getByGithubUserId
};

export { accountApi as default };
//# sourceMappingURL=account-DyUSFbE_.js.map
