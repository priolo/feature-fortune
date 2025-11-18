import ajax from '../plugins/AjaxService-oFOrX7Jo.js';

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

export { commentApi as default };
//# sourceMappingURL=comment-lVJVKqoI.js.map
