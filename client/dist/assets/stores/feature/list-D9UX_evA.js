import featureApi from "../../api/feature-COYEjIv7.js";
import { createStore as bn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
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
//# sourceMappingURL=list-D9UX_evA.js.map
