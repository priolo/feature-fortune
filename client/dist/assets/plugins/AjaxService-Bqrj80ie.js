import logStore from "../stores/log/index-Cd7lJm-l.js";
import { MESSAGE_TYPE } from "../stores/log/utils-CDYR0Lxi.js";
const optionsDefault = {
  baseUrl: "/api/",
  /** si tratta di una richiesta di login */
  isLogin: false,
  loading: true,
  noError: false,
  store: null,
  /** utilizza questo signal per fare l'abort */
  signal: null,
  /** se true setto nello store l'oggetto per l'abort */
  manageAbort: false,
  /** [DISABILITATO] non restituire trasformato in camelCase */
  noCamel: false
};
class AjaxService {
  async post(url, data, options) {
    return await this.send(url, "post", data, options);
  }
  async get(url, options) {
    return await this.send(url, "get", null, options);
  }
  async patch(url, data, options) {
    return await this.send(url, "PATCH", data, options);
  }
  async put(url, data, options) {
    return await this.send(url, "put", data, options);
  }
  async delete(url, data, options) {
    return await this.send(url, "delete", data, options);
  }
  /**
   * Send a ajax to server
   */
  async send(url, method, data, options = {}) {
    var _a, _b, _c, _d;
    options = { ...optionsDefault, ...options };
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    let response = null;
    try {
      response = await fetch(
        `${options.baseUrl}${url}`,
        {
          method,
          headers,
          body: data ? JSON.stringify(data) : void 0,
          signal: options.signal,
          ...options.isLogin ? { credentials: "include" } : {}
        }
      );
    } catch (e) {
      if (options.noError) return;
      if (e.code != 20) {
        logStore.add({
          type: MESSAGE_TYPE.ERROR,
          title: "http:error:fetch",
          body: e.toString(),
          targetId: (_b = (_a = options.store) == null ? void 0 : _a.state) == null ? void 0 : _b.uuid
        });
      }
      throw e;
    } finally {
    }
    let ret = null;
    let jsonError = null;
    try {
      const raw = await response.json();
      ret = raw;
    } catch (e) {
      jsonError = e.toString();
    }
    const status = response.status;
    if (status >= 400 && !options.noError) {
      const error = (ret == null ? void 0 : ret.error) ?? jsonError ?? `${status} generic`;
      logStore.add({
        type: MESSAGE_TYPE.ERROR,
        title: `http:error:${status}`,
        body: error,
        targetId: (_d = (_c = options.store) == null ? void 0 : _c.state) == null ? void 0 : _d.uuid
      });
      throw error;
    }
    return ret;
  }
}
const ajax = new AjaxService();
export {
  AjaxService,
  ajax as default
};
//# sourceMappingURL=AjaxService-Bqrj80ie.js.map
