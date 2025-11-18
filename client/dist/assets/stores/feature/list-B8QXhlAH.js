import featureApi from "../../api/feature-UgSXkzAA.js";
import { createStore as bn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
const setup = {
  state: {
    all: null
  },
  getters: {},
  actions: {
    async fetch(_, store) {
      var _a;
      const features = (_a = await featureApi.index()) == null ? void 0 : _a.features;
      store.setAll(features);
    },
    async create(_, store) {
    }
  },
  mutators: {
    setAll: (all) => ({ all })
  }
};
const featureListSo = bn(setup);
export {
  featureListSo as default
};
//# sourceMappingURL=list-B8QXhlAH.js.map
