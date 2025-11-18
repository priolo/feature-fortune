import ajax from '../plugins/AjaxService-B27u9Z3Z.js';
import { MESSAGE_ROLE } from '../types/Message-B1UVZTvm.js';

function index(role = MESSAGE_ROLE.RECEIVER, opt) {
  return ajax.get(`messages?role=${role}`, opt);
}
function save(text, toAccountId, opt) {
  if (!text || !toAccountId) throw new Error("Message content ID is required");
  return ajax.post(`messages`, { text, toAccountId }, opt);
}
function remove(messageId, opt) {
  if (!messageId) throw new Error("Message content ID is required");
  return ajax.delete(`messages/${messageId}`, null, opt);
}
function markAsRead(messageId, opt) {
  if (!messageId) throw new Error("Message content ID is required");
  return ajax.patch(`messages/${messageId}/read`, null, opt);
}
const messageApi = {
  index,
  save,
  remove,
  markAsRead
};

export { messageApi as default };
//# sourceMappingURL=message-ym03mF06.js.map
