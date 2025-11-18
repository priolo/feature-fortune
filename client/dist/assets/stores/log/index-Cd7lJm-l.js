import { createStore as bn } from "../../node_modules/@priolo/jon/dist/index.es-ByGnCPlJ.js";
import { MESSAGE_TYPE } from "./utils-CDYR0Lxi.js";
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
export {
  logStore as default
};
//# sourceMappingURL=index-Cd7lJm-l.js.map
