function groupBy(array2, callback) {
  if (array2.length === 0)
    return [];
  return array2.reduce((groups, item) => {
    const groupEq = groups.find((group) => group.length > 0 && callback(group[0], item));
    if (groupEq) {
      groupEq.push(item);
    } else {
      groups.push([item]);
    }
    return groups;
  }, []);
}
function groupByKey(array2, keySelector) {
  return array2.reduce((groups, item) => {
    const key = keySelector(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}
function groupByKeyToArray(array2, keySelector) {
  const groupsMap = /* @__PURE__ */ new Map();
  for (const item of array2) {
    const key = keySelector(item);
    if (!groupsMap.has(key)) {
      groupsMap.set(key, []);
    }
    groupsMap.get(key).push(item);
  }
  return Array.from(groupsMap.entries()).map(([key, items]) => ({
    key,
    items
  }));
}
const array = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  groupBy,
  groupByKey,
  groupByKeyToArray
}, Symbol.toStringTag, { value: "Module" }));
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isObjectStrict(value) {
  return value !== null && !Array.isArray(value) && typeof value === "object";
}
function isString(value) {
  return typeof value === "string" || value instanceof String;
}
function isUrl(value) {
  return !!getUrlFromString(value);
}
function isUrlImage(value) {
  const url2 = getUrlFromString(value);
  if (!url2)
    return false;
  const ext = url2.pathname.split(".").pop();
  if (ext == null)
    return false;
  return ["jpg", "jpeg", "png", "gif"].includes(ext.toLowerCase());
}
function getUrlFromString(value) {
  let url2;
  try {
    url2 = new URL(value);
  } catch (_) {
    return null;
  }
  return url2.protocol === "http:" || url2.protocol === "https:" ? url2 : null;
}
const isType = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isObject,
  isObjectStrict,
  isString,
  isUrl,
  isUrlImage
}, Symbol.toStringTag, { value: "Module" }));
function isEqual(v1, v2, options) {
  if (options?.ignoreUndefined && v1 == null && v2 == null)
    return true;
  return Object.is(v1, v2);
}
function isEqualDeep(v1, v2, options = {}) {
  if (!isObject(v1) || !isObject(v2)) {
    return isEqual(v1, v2, options);
  }
  for (let key in v1) {
    if (!isEqualDeep(v1[key], v2[key], options))
      return false;
  }
  for (let key in v2) {
    if (!v1.hasOwnProperty(key))
      return false;
  }
  return true;
}
const equal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isEqual,
  isEqualDeep
}, Symbol.toStringTag, { value: "Module" }));
function find(arr, item, start = 0, max = 6) {
  for (let i = start; i < arr.length && i < max; i++) {
    const itemCur = arr[i];
    if (isEqualDeep(item, itemCur))
      return i;
  }
  return -1;
}
function diffArray(a1, arr2) {
  const delta = [];
  const arr1 = [...a1];
  let i = 0;
  while (i < arr2.length) {
    let act = null;
    if (i >= arr1.length) {
      const act2 = { type: "add", val: arr2[i] };
      delta.push(act2);
      exeArray(act2, arr1);
      i++;
      continue;
    }
    const item1 = arr1[i];
    const index1in2 = find(arr2, item1, i);
    if (index1in2 == i) {
      i++;
      continue;
    } else if (index1in2 == -1) {
      const item2 = arr2[i];
      const index2in1 = find(arr1, item2, i);
      if (index2in1 == -1) {
        act = { type: "sub", from: i, val: item2 };
      } else {
        act = { type: "mov", from: index2in1, to: i };
      }
      i++;
      delta.push(act);
      exeArray(act, arr1);
    } else if (index1in2 != -1) {
      act = { type: "mov", from: i, to: index1in2 };
      delta.push(act);
      exeArray(act, arr1);
    }
  }
  if (arr2.length < arr1.length) {
    delta.push({ type: "len", val: arr2.length });
  }
  return delta;
}
function exeArray(action, arr) {
  if (action.to == null)
    action.to = 0;
  if (action.from == null)
    action.from = 0;
  switch (action.type) {
    case "del":
      arr.splice(action.from, 1);
      break;
    case "mov":
      const tmp = arr[action.to];
      arr[action.to] = arr[action.from];
      arr[action.from] = tmp;
      break;
    case "sub":
      arr[action.from] = action.val;
      break;
    case "ins":
      arr.splice(action.from, 0, action.val);
      break;
    case "add":
      arr.push(action.val);
      break;
    case "len":
      arr.length = action.val;
      break;
  }
}
function addArray(a, delta) {
  const arr = [...a];
  delta.forEach((action) => exeArray(action, arr));
  return arr;
}
diff.NO_DIFFERENCE_KEY = "__no-difference__";
function diff(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    return isEqual(obj1, obj2) ? diff.NO_DIFFERENCE_KEY : obj2;
  }
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    return diffArray(obj1, obj2);
  }
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    return obj2;
  }
  const ret = {};
  for (let key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      let res = diff(obj1[key], obj2[key]);
      if (res != diff.NO_DIFFERENCE_KEY) {
        ret[key] = res;
      }
    } else {
      if (ret._deleted == null)
        ret._deleted = [];
      ret._deleted.push(key);
    }
  }
  for (let key in obj2) {
    if (obj1.hasOwnProperty(key))
      continue;
    ret[key] = obj2[key];
  }
  return Object.keys(ret).length == 0 ? diff.NO_DIFFERENCE_KEY : ret;
}
function add(obj2, delta) {
  if (!isObject(delta)) {
    return delta;
  }
  let ret = {};
  for (let key in delta) {
    if (key == "_deleted")
      continue;
    if (Array.isArray(obj2[key])) {
      ret[key] = addArray(obj2[key], delta[key]);
    } else {
      ret[key] = add(obj2[key], delta[key]);
    }
  }
  if (!isObject(obj2))
    return ret;
  for (let key in obj2) {
    if (Object.keys(delta).some((k) => k == key))
      continue;
    if (delta._deleted && delta._deleted.some((k) => k == key))
      continue;
    ret[key] = obj2[key];
  }
  return ret;
}
const diff$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add,
  diff
}, Symbol.toStringTag, { value: "Module" }));
function getValueWithPath(path, root, def) {
  try {
    let { parent, value } = getParentAndKey(path, root);
    if (typeof value === "function")
      return value.bind(parent);
    return value;
  } catch (e) {
    return def;
  }
}
function setValueWithPath(path, root, value) {
  let { parent, key } = getParentAndKey(path, root, true);
  if (typeof key === "number")
    return parent.splice(key, 1, value);
  return parent[key] = value;
}
function getParentAndKey(pathStr, root, bCreate = false) {
  let paths = pathStr.split(".");
  let current = root || window;
  let lastSubpath = "";
  let parent;
  for (let cont = 0; cont < paths.length; cont++) {
    let subPath = paths[cont];
    let indexQ = subPath.indexOf("[");
    if (indexQ != -1) {
      let index2 = Number(subPath.substring(indexQ + 1, subPath.length - 1));
      let name = subPath.substring(0, indexQ);
      parent = current[name];
      current = parent;
      subPath = index2.toString();
      lastSubpath = subPath;
    } else {
      parent = current;
      lastSubpath = subPath;
    }
    if (current[subPath] == void 0) {
      if (bCreate) {
        current[subPath] = {};
      } else {
        throw new Error(`Il parametro: ${pathStr}; non esiste`);
      }
    }
    current = current[subPath];
  }
  return {
    parent,
    key: lastSubpath,
    value: current
  };
}
function objectIsIn(obj1, obj2, ignoreNull = false) {
  if (ignoreNull && obj2 == null)
    return true;
  if (Object.is(obj1, obj2))
    return true;
  if (_equalFunction(obj1, obj2))
    return true;
  if (_equalDate(obj1, obj2))
    return true;
  if (typeof obj1 == "object" && typeof obj2 == "object") {
    for (var p in obj1) {
      if (!obj2.hasOwnProperty(p))
        return false;
      if (!objectIsIn(obj1[p], obj2[p], ignoreNull))
        return false;
    }
    return true;
  }
  return false;
}
function _equalFunction(f1, f2) {
  if (typeof f1 != "function" || typeof f2 != "function")
    return false;
  let f1s = f1.toString();
  f1s = f1s.substring(f1s.indexOf("{"));
  let f2s = f2.toString();
  f2s = f2s.substring(f2s.indexOf("{"));
  return f1s == f2s;
}
function _equalDate(d1, d2) {
  if (!(d1 instanceof Date) || !(d2 instanceof Date))
    return false;
  return d1.getTime() == d2.getTime();
}
function clonePath(obj2, path) {
  let objClone = { ...obj2 };
  let index2 = path.indexOf(".");
  if (index2 == -1)
    return objClone;
  let subprop = path.slice(0, index2);
  if (objClone[subprop] == void 0)
    throw "Path non trovata";
  objClone[subprop] = clonePath(objClone[subprop], path.slice(index2 + 1));
  return objClone;
}
function minCommonProps(objects) {
  return objects.reduce((objRef, obj2) => {
    const keysRef = new Set(Object.keys(objRef));
    for (const key in obj2) {
      if (!(key in objRef)) {
        objRef[key] = obj2[key];
      } else if (objRef[key] !== obj2[key]) {
        objRef[key] = null;
      }
      keysRef.delete(key);
    }
    keysRef.forEach((key) => objRef[key] = null);
    return objRef;
  }, {});
}
function cloneDeep(obj2) {
  if (obj2 == void 0)
    return void 0;
  return JSON.parse(JSON.stringify(obj2));
}
function clone(obj2) {
  return { ...obj2 };
}
function merge(obj1, obj2, replaceNulls = true) {
  if (replaceNulls) {
    if (obj1 == null && obj2 != null)
      return obj2;
    if (obj1 != null && obj2 == null)
      return obj1;
  }
  if (!isObject(obj1) || !isObject(obj2))
    return obj1;
  if (Array.isArray(obj1) && Array.isArray(obj2))
    return mergeArray(obj1, obj2);
  if (Array.isArray(obj1) || Array.isArray(obj2))
    return obj1;
  return Object.keys(obj1).reduce((merged, key) => {
    if (obj2.hasOwnProperty(key)) {
      merged[key] = merge(obj1[key], obj2[key]);
    } else {
      merged[key] = obj1[key];
    }
    return merged;
  }, { ...obj2 });
}
function mergeArray(arr1, arr2) {
  const ret = [];
  for (let i = 0; i < arr1.length && i < arr2.length; i++) {
    ret[i] = merge(arr1[i], arr2[i]);
  }
  return ret.concat(arr1.length > arr2.length ? arr1.slice(arr2.length) : arr2.slice(arr1.length));
}
function reduceObject(source, dest, callback, paths = [], root) {
  for (const key in source) {
    dest[key] = _getCloneValue(source[key]);
    const allPaths = [...paths, key];
    const goDeep = callback ? callback(source, dest, root, allPaths) : true;
    if (isObject(dest[key]) && goDeep) {
      reduceObject(source[key], dest[key], callback, allPaths, source);
    }
  }
  return dest;
}
function _getCloneValue(value) {
  if (isObjectStrict(value)) {
    return {};
  } else if (Array.isArray(value)) {
    return [];
  } else {
    return value;
  }
}
function matchPath(source, template) {
  const sPaths = source.split(".");
  const tPaths = template.split(".");
  return matchPathArray(sPaths, tPaths);
}
function matchPathArray(source, template, deep = 0) {
  if (template.length == 0)
    return deep;
  if (source.length < template.length)
    return -1;
  const sPath = source[0];
  const tPath = template[0];
  deep++;
  if (tPath == sPath || tPath === "*") {
    return matchPathArray(source.slice(1), template.slice(1), deep);
  }
  if (tPath === "?") {
    for (let tries = 0; tries < source.length - template.length + 1; tries++) {
      let res = matchPathArray(source.slice(1 + tries), template.slice(1), deep);
      if (res != -1)
        return tries + res;
    }
  }
  return -1;
}
const obj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clone,
  cloneDeep,
  clonePath,
  getParentAndKey,
  getValueWithPath,
  matchPath,
  matchPathArray,
  merge,
  mergeArray,
  minCommonProps,
  objectIsIn,
  reduceObject,
  setValueWithPath
}, Symbol.toStringTag, { value: "Module" }));
const KEY_NOT_FOUND = "key-not-found";
function exploreMap(obj2, paths, withError = false) {
  if (!Array.isArray(paths))
    paths = [paths];
  const ret = paths.reduce((acc, path) => acc.concat(explore(obj2, path)), []).flat();
  if (!withError)
    return ret.filter((prop) => !prop.error);
  return ret;
}
function explore(obj2, path) {
  if (Array.isArray(obj2)) {
    return obj2.map((item, i) => {
      const ref = explore(item, path);
      return ref;
    }).flat();
  }
  const index2 = path.indexOf(".");
  if (index2 == -1) {
    const ret = { parent: obj2, key: path };
    if (!(path in obj2))
      ret.error = KEY_NOT_FOUND;
    return ret;
  }
  const key = path.slice(0, index2);
  const newPath = path.slice(index2 + 1);
  if (!(key in obj2))
    return { parent: obj2, key, error: KEY_NOT_FOUND };
  const value = obj2[key];
  return explore(value, newPath);
}
function includeMap(obj2, paths) {
  if (!Array.isArray(paths))
    paths = [paths];
  const ret = paths.reduce((acc, path) => {
    const ret2 = include(obj2, path);
    if (ret2 == null)
      return acc;
    return merge(ret2, acc);
  }, {});
  return ret;
}
function include(obj2, path) {
  if (!isObject(obj2) || !isString(path))
    return null;
  if (Array.isArray(obj2)) {
    return obj2.map((item, i) => include(item, path));
  }
  const index2 = path.indexOf(".");
  if (index2 == -1) {
    if (!(path in obj2))
      return null;
    return { [path]: obj2[path] };
  }
  const key = path.slice(0, index2);
  const newPath = path.slice(index2 + 1);
  const value = obj2[key];
  return { [key]: include(value, newPath) };
}
const explore$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  KEY_NOT_FOUND,
  explore,
  exploreMap,
  include,
  includeMap
}, Symbol.toStringTag, { value: "Module" }));
function jsonStream(obj2) {
  if (Array.isArray(obj2)) {
    return JSON.stringify(obj2.map((i) => jsonStream(i)));
  } else if (typeof obj2 === "string") {
    return `"${obj2}"`;
  } else if (typeof obj2 === "object" && obj2 !== null) {
    return Object.keys(obj2).sort().map((k) => `${k}:${jsonStream(obj2[k])}`).join("|");
  }
  return obj2;
}
function hashCode(str) {
  let hash = 0, i, chr;
  if (str.length === 0)
    return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}
const jsonHash = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hashCode,
  jsonStream
}, Symbol.toStringTag, { value: "Module" }));
const timeoutIDs = {};
function debounce(name, callback, delay2 = 0) {
  if (delay2 === 0) {
    callback();
    return;
  }
  const existingTimeout = timeoutIDs[name];
  if (existingTimeout) {
    clearTimeout(existingTimeout);
  }
  timeoutIDs[name] = setTimeout(() => {
    delete timeoutIDs[name];
    callback();
  }, delay2);
}
const delay = (millisec) => new Promise((resolve) => setTimeout(resolve, millisec));
async function waitTimeout(timeout, promise) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout superato dopo ${timeout}ms`)), timeout);
  });
  return Promise.race([promise, timeoutPromise]);
}
function* forDates(start, end, step) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const [minDate, maxDate] = startTime < endTime ? [startTime, endTime] : [endTime, startTime];
  let currentDate = new Date(minDate);
  while (currentDate.getTime() <= maxDate) {
    yield currentDate.getTime();
    currentDate.setDate(currentDate.getDate() + step);
  }
}
const time = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  debounce,
  delay,
  forDates,
  waitTimeout
}, Symbol.toStringTag, { value: "Module" }));
function memoize(func2) {
  const results = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    let res = results[argsKey];
    if (!res) {
      res = func2(...args);
      results[argsKey] = res;
    }
    return res;
  };
}
const func = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  memoize
}, Symbol.toStringTag, { value: "Module" }));
const fs = {};
async function getDirInfo(dir) {
  const files = await fs.promises.readdir(dir);
  let size = 0;
  let fileOld = null;
  let deltaOld = 0;
  let now = Date.now();
  for (const file of files) {
    const stat = await fs.promises.stat(fs.join(dir, file));
    size += stat.size;
    const delta = Math.abs(now - stat.birthtimeMs);
    if (delta > deltaOld) {
      deltaOld = delta;
      fileOld = file;
    }
  }
  return { size, fileOld };
}
async function createDirIfNotExist(path) {
  const exist = await getIfExists(path);
  if (exist)
    return;
  fs.promises.mkdir(path, { recursive: true });
}
async function deleteIfExist(pathItem, secure = true) {
  if (secure && !isSubDir(process.cwd(), pathItem))
    return false;
  const exist = await getIfExists(pathItem);
  if (!exist)
    return false;
  try {
    await fs.promises.rm(pathItem, { recursive: true, force: true });
    return true;
  } catch (e) {
    return false;
  }
}
function isSubDir(parent, dir) {
  const relative = fs.relative(parent, dir);
  return relative && !relative.startsWith("..") && !fs.isAbsolute(relative);
}
async function getIfExists(path) {
  try {
    await fs.promises.access(path, fs.constants.F_OK);
  } catch (err) {
    return false;
  }
  return true;
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createDirIfNotExist,
  deleteIfExist,
  getDirInfo,
  getIfExists,
  isSubDir
}, Symbol.toStringTag, { value: "Module" }));
class EventEmitter {
  /**
   * Per mette di inizializzare degli eventi cosi' da poter utilizzare l'evento speciale "*"
   */
  constructor(events) {
    if (!!events && Array.isArray(events)) {
      this.eventsCallbacks = events.reduce((acc, event) => {
        acc[event] = [];
        return acc;
      }, {});
    }
  }
  /**
   * Una dictionary di eventi e i relativi listener
   */
  eventsCallbacks = {};
  /**
   * Aggiunge un listener per un evento
   * @param event evento da gestire, "*" per tutti gli eventi attualmente, "$" evento chiamato sempre in forma anonima
   * @param callback funzione da eseguire
   **/
  on(event, callback) {
    if (event == "*")
      event = Object.keys(this.eventsCallbacks);
    if (Array.isArray(event))
      return event.forEach((key) => this.on(key, callback));
    let callbacks = this.eventsCallbacks[event];
    if (!callbacks) {
      callbacks = [];
      this.eventsCallbacks[event] = callbacks;
    }
    callbacks.push(callback);
  }
  /**
   * Rimuove un listener per un evento specifico
   */
  off(event, callback) {
    if (event == "*")
      event = Object.keys(this.eventsCallbacks);
    if (Array.isArray(event))
      return event.forEach((key) => this.off(key, callback));
    let callbacks = this.eventsCallbacks[event];
    if (!callbacks)
      return;
    if (!callback)
      return this.eventsCallbacks[event] = [];
    this.eventsCallbacks[event] = callbacks.filter((cb) => cb != callback);
  }
  /**
   * Elimina tutti i listener per un evento
   * se event == null elimina tutti i listener
   */
  offAll(event) {
    if (!event) {
      this.eventsCallbacks = {};
      return;
    }
    delete this.eventsCallbacks[event];
  }
  /**
   * Esegue un listener solo una volta
   */
  once(event, callback) {
    this.on(event, (e) => {
      callback(e);
      this.off(event, callback);
    });
  }
  /**
   * Permette di emettere un evento
   */
  emit(event, payload) {
    const callbacks = (this.eventsCallbacks[event] ?? []).concat(this.eventsCallbacks["$"] ?? []);
    for (const callback of callbacks) {
      callback({ event, payload });
    }
  }
}
function clipboardSet(text) {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
async function clipboardGet() {
  return await navigator.clipboard.readText();
}
const clipboard = {
  set: clipboardSet,
  get: clipboardGet
};
const LOG_CMM = {
  Reset: "\x1B[0m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m"
};
const LOG_TYPE_STYLE = [
  LOG_CMM.FgGreen,
  LOG_CMM.FgCyan,
  LOG_CMM.FgYellow,
  LOG_CMM.FgRed,
  LOG_CMM.FgMagenta
];
const LOG_TYPE_LABEL = [
  "DEBUG: ",
  "INFO: ",
  "WARNING: ",
  "ERROR: ",
  "FATAL: "
];
var LOG_TYPE;
(function(LOG_TYPE2) {
  LOG_TYPE2[LOG_TYPE2["DEBUG"] = 0] = "DEBUG";
  LOG_TYPE2[LOG_TYPE2["INFO"] = 1] = "INFO";
  LOG_TYPE2[LOG_TYPE2["WARNING"] = 2] = "WARNING";
  LOG_TYPE2[LOG_TYPE2["ERROR"] = 3] = "ERROR";
  LOG_TYPE2[LOG_TYPE2["FATAL"] = 4] = "FATAL";
})(LOG_TYPE || (LOG_TYPE = {}));
var LOG_LEVEL;
(function(LOG_LEVEL2) {
  LOG_LEVEL2[LOG_LEVEL2["PROD"] = 0] = "PROD";
  LOG_LEVEL2[LOG_LEVEL2["DEV"] = 1] = "DEV";
  LOG_LEVEL2[LOG_LEVEL2["DEBUG"] = 3] = "DEBUG";
})(LOG_LEVEL || (LOG_LEVEL = {}));
function log(message, type = LOG_TYPE.INFO, param) {
  if (log.options.enabled == false || log.options.level == LOG_LEVEL.PROD || log.options.level == LOG_LEVEL.DEV && type == LOG_TYPE.DEBUG)
    return;
  console.log(`${LOG_TYPE_STYLE[type]}${LOG_TYPE_LABEL[type]}${LOG_CMM.Reset}${message}`);
  if (param != null) {
    console.log(param);
  }
}
log.options = {
  level: LOG_LEVEL.DEV,
  enabled: true
};
const TILE_SIZE = 256;
function gmPoint(lat, lng) {
  let siny = Math.sin(lat * Math.PI / 180);
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  return {
    x: TILE_SIZE * (0.5 + lng / 360),
    y: TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
  };
}
function distance(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var squarehalfChordLength = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var angularDistance = 2 * Math.atan2(Math.sqrt(squarehalfChordLength), Math.sqrt(1 - squarehalfChordLength));
  var distance2 = R * angularDistance;
  return distance2;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
const GeoPosition = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  distance,
  gmPoint
}, Symbol.toStringTag, { value: "Module" }));
function email(value) {
  if (/^[^\s@]+@[^\s@]+$/.test(value))
    return true;
  return false;
}
function obligatory(value) {
  if (value != null && value.trim().length > 0)
    return true;
  return false;
}
function obligatoryArray(value) {
  if (Array.isArray(value) && value.length > 0)
    return true;
  return false;
}
function url(value) {
  var pattern = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
  if (!!pattern.test(value))
    return true;
  return false;
}
function verify(value, option) {
  if (!option)
    return true;
  if (typeof option == "string") {
    const optional = option.charAt(0) == "?";
    if (optional)
      option = option.slice(1);
    if (optional && value == null)
      return true;
    const [type, param] = option.split(":");
    switch (type) {
      case "email":
        return email(value);
      case "url":
        return url(value);
      case "tel":
        return /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g.test(value);
      case "string":
        if (typeof value != "string")
          return false;
        return operator(value.trim().length, param);
      case "array":
        if (!Array.isArray(value))
          return false;
        return operator(value.length, param);
      case "int":
        if (!Number.isInteger(value))
          return false;
        return operator(value, param);
      case "number":
        if (!Number.isFinite(value))
          return false;
        return operator(value, param);
    }
    return true;
  }
  if (Array.isArray(option)) {
    return option.every((opt) => verify(value, opt));
  }
  if (typeof option == "object") {
    const keys = Object.keys(option);
    for (const key of keys) {
      const newValue = value[key];
      const newOption = option[key];
      if (verify(newValue, newOption) == false)
        return false;
    }
  }
  return true;
}
function operator(value, operator2) {
  if (operator2 == null || operator2.length == 0)
    return true;
  let op = operator2.charAt(0);
  let param;
  if (isNaN(op)) {
    param = +operator2.slice(1);
  } else {
    op = "=";
    param = +operator2;
  }
  switch (op) {
    case "=":
      return value == param;
    case ">":
      return value > param;
    case "<":
      return value < param;
    case "!":
      return value != param;
    default:
      return true;
  }
}
const validator = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  email,
  obligatory,
  obligatoryArray,
  url,
  verify
}, Symbol.toStringTag, { value: "Module" }));
const eq = { ...equal, ...isType };
export {
  EventEmitter,
  GeoPosition,
  LOG_LEVEL,
  LOG_TYPE,
  validator as Validator,
  array,
  clipboard,
  diff$1 as diff,
  eq,
  explore$1 as explore,
  index as filesystem,
  func,
  jsonHash as json,
  log,
  obj,
  time
};
//# sourceMappingURL=jon-utils-DHOrT0Mb.js.map
