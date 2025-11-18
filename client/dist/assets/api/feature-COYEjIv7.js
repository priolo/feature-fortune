import ajax from "../plugins/AjaxService-Bqrj80ie.js";
function index(opt) {
  return ajax.get(`features`, opt);
}
function get(id, opt) {
  return ajax.get(`features/${id}`, opt);
}
function create(feature, opt) {
  delete feature.id;
  delete feature.accountId;
  delete feature.status;
  delete feature.createdAt;
  delete feature.comments;
  delete feature.fundings;
  return ajax.post(`features`, { feature }, opt);
}
function update(feature, opt) {
  delete feature.status;
  delete feature.createdAt;
  delete feature.comments;
  delete feature.fundings;
  return ajax.patch(`features`, { feature }, opt);
}
function remove(featureId, opt) {
  return ajax.delete(`features/${featureId}`, null, opt);
}
function action(featureId, action2, opt) {
  return ajax.post(`features/${featureId}/action`, { action: action2 }, opt);
}
const featureApi = {
  index,
  get,
  create,
  update,
  remove,
  action
};
export {
  featureApi as default
};
//# sourceMappingURL=feature-COYEjIv7.js.map
