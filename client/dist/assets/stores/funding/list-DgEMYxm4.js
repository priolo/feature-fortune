import fundingApi from "../../api/funding-CTAEsnWf.js";
import { createStore as bn } from "../../node_modules/@priolo/jon/dist/index.es-DEeDXcIY.js";
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
      store.setAll(res == null ? void 0 : res.fundings);
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
export {
  fundingListSo as default
};
//# sourceMappingURL=list-DgEMYxm4.js.map
