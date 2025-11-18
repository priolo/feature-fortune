import fundingApi from '../../api/funding-SnpAEMiX.js';
import { createStore as bn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';

const setup = {
  state: {
    filter: null,
    all: null,
    selected: null
  },
  getters: {},
  actions: {
    async fetch(filter, store) {
      store.state.filter = filter ?? store.state.filter;
      const res = await fundingApi.index(store.state.filter);
      store.setAll(res?.fundings);
    },
    async saveSelected(_, store) {
      const { funding } = await fundingApi.save(store.state.selected);
      store.setSelected(funding);
      await store.fetch();
    }
  },
  mutators: {
    setAll: (all) => ({ all }),
    setSelected: (selected) => ({ selected })
  }
};
const fundingListSo = bn(setup);

export { fundingListSo as default };
//# sourceMappingURL=list-DfpgSy3C.js.map
