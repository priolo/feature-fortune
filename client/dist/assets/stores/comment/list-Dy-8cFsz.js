import commentApi from '../../api/comment-q_qPa1FP.js';
import { createStore as bn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';

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
      store.setAll(res?.comments);
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

export { commentListSo as default };
//# sourceMappingURL=list-Dy-8cFsz.js.map
