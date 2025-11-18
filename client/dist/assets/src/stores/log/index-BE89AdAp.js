import { createStore as bn } from '../../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';
import { MESSAGE_TYPE } from './utils-DR4-045x.js';

const setup = {
  state: {
    all: []
  },
  getters: {},
  actions: {
    add(log, store) {
      if (!log.type) log.type = MESSAGE_TYPE.INFO;
      log.receivedAt = Date.now();
      store.setAll([...store.state.all, log]);
    },
    addError(error, store) {
      if (!error) return;
      store.add({
        type: MESSAGE_TYPE.ERROR,
        title: error.message,
        body: error.stack
      });
      console.error(error);
    },
    clear(_, store) {
      store.setAll([]);
    }
  },
  mutators: {
    setAll: (all) => ({ all })
  }
};
const logStore = bn(setup);

export { logStore as default };
//# sourceMappingURL=index-BE89AdAp.js.map
