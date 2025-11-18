function getAllSenders(messages) {
  const acc = /* @__PURE__ */ new Map();
  for (const message of messages) {
    const content = message.content;
    const accountId = content?.accountId ?? content?.account?.id;
    if (!accountId || acc.has(accountId)) continue;
    acc.set(accountId, content?.account);
  }
  return Array.from(acc.values()).sort((acc1, acc2) => acc1.name.localeCompare(acc2.name));
}

export { getAllSenders };
//# sourceMappingURL=utils-CgioDnah.js.map
