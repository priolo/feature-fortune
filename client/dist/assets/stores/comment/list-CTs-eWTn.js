import commentApi from "../../api/comment-BB5wkVtF.js";
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
      const res = await commentApi.index(store.state.filter);
      store.setAll(res == null ? void 0 : res.comments);
    },
    async saveSelected(_, store) {
      const { comment } = await commentApi.save(store.state.selected);
      store.setSelected(comment);
      await store.fetch();
    }
  },
  mutators: {
    setAll: (all) => ({ all }),
    setSelected: (selected) => ({ selected })
  }
};
const commentListSo = bn(setup);
export {
  commentListSo as default
};
//# sourceMappingURL=list-CTs-eWTn.js.map
