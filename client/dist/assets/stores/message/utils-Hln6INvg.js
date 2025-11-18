function getAllSenders(messages) {
  var _a;
  const acc = /* @__PURE__ */ new Map();
  for (const message of messages) {
    const content = message.content;
    const accountId = (content == null ? void 0 : content.accountId) ?? ((_a = content == null ? void 0 : content.account) == null ? void 0 : _a.id);
    if (!accountId || acc.has(accountId)) continue;
    acc.set(accountId, content == null ? void 0 : content.account);
  }
  return Array.from(acc.values()).sort((acc1, acc2) => acc1.name.localeCompare(acc2.name));
}
export {
  getAllSenders
};
//# sourceMappingURL=utils-Hln6INvg.js.map
