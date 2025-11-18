import { createStore as bn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
const setup = {
  state: {
    current: null
  },
  getters: {},
  actions: {},
  mutators: {
    setCurrent: (current) => ({ current })
  }
};
const locationSo = bn(setup);
var LOCATION_PAGE = /* @__PURE__ */ ((LOCATION_PAGE2) => {
  LOCATION_PAGE2["FeaturesList"] = "feature-list";
  LOCATION_PAGE2["FeatureDetail"] = "feature-detail";
  LOCATION_PAGE2["Login"] = "auth-login";
  LOCATION_PAGE2["Account"] = "auth-account";
  LOCATION_PAGE2["Messages"] = "messages";
  return LOCATION_PAGE2;
})(LOCATION_PAGE || {});
export {
  LOCATION_PAGE,
  locationSo as default
};
//# sourceMappingURL=index-CWD3Tsyk.js.map
