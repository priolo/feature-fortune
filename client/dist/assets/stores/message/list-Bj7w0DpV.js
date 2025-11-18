import messageApi from '../../api/message-ym03mF06.js';
import { MESSAGE_ROLE } from '../../types/Message-B1UVZTvm.js';
import { createStore as bn } from '../../node_modules/@priolo/jon/dist/index.es-8v3wK2PD.js';

const setup = {
  state: {
    all: null,
    selected: null,
    receiverId: null
  },
  getters: {},
  actions: {
    async fetch(_, store) {
      const messages = (await messageApi.index(MESSAGE_ROLE.RECEIVER))?.messages;
      store.setAll(messages);
    },
    async createAndSelect(receiverId, store) {
      const content = {
        accountId: receiverId,
        text: ""
      };
      const message = {
        content,
        accountId: null,
        // non usato: è lo stesso dell'utente loggato
        role: MESSAGE_ROLE.SENDER,
        isRead: true,
        isArchived: false
      };
      store.setSelected(message);
      store.setReceiverId(null);
    },
    async sendSelected(_, store) {
      const message = store.state.selected;
      if (!message) throw new Error("No message selected");
      const { content, msgReceiver, msgSender } = await messageApi.save(
        message.content.text,
        message.content.accountId
      );
      store.setSelected(null);
    },
    /**
     * rimuove un MESSAGGIO tramite il suo id e aggiorna la lista
     */
    async remove(messageId, store) {
      const res = (await messageApi.remove(messageId))?.success;
      if (!res) throw new Error("Error deleting message");
      store.setSelected(null);
      store.setAll(store.state.all.filter((m) => m.id !== messageId));
    }
  },
  mutators: {
    setAll: (all) => ({ all }),
    setSelected: (selected) => ({ selected }),
    setReceiverId: (receiverId) => ({ receiverId })
  }
};
const messageListSo = bn(setup);

export { messageListSo as default };
//# sourceMappingURL=list-Bj7w0DpV.js.map
