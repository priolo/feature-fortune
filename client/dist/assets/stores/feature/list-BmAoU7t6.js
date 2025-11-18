import featureApi from '../../api/feature-DKjbSCSw.js';
import { createStore as bn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';

const setup = {
  state: {
    all: null
  },
  getters: {},
  actions: {
    async fetch(_, store) {
      const features = (await featureApi.index())?.features;
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

export { featureListSo as default };
//# sourceMappingURL=list-BmAoU7t6.js.map
