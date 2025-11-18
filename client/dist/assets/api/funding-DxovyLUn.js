import ajax from '../plugins/AjaxService-B27u9Z3Z.js';

function index(filter, opt) {
  const query = new URLSearchParams(filter).toString();
  return ajax.get(`fundings?${query}`, opt);
}
function save(funding, opt) {
  return ajax.post(`fundings`, { funding }, opt);
}
const fundingApi = {
  index,
  save
};

export { fundingApi as default };
//# sourceMappingURL=funding-DxovyLUn.js.map
