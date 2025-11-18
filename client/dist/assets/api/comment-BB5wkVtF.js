import ajax from "../plugins/AjaxService-j9sgKia1.js";
function index(filter, opt) {
  const query = new URLSearchParams(filter).toString();
  return ajax.get(`comments?${query}`, opt);
}
function save(comment, opt) {
  return ajax.post(`comments`, { comment }, opt);
}
const commentApi = {
  index,
  save
};
export {
  commentApi as default
};
//# sourceMappingURL=comment-BB5wkVtF.js.map
