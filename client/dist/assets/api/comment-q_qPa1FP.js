import ajax from '../plugins/AjaxService-B27u9Z3Z.js';

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
//# sourceMappingURL=comment-q_qPa1FP.js.map
