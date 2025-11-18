import { FEATURE_FILTER, FEATURE_SORT } from "./types-TK7-yYif.js";
function filterByAccount(features, filter, userId) {
  if (!features) return [];
  if (!filter || !userId) return features;
  switch (filter) {
    case FEATURE_FILTER.MY:
      return features.filter((feature) => feature.accountId == userId);
    case FEATURE_FILTER.FINANCED:
      return features.filter((f) => {
        var _a;
        return (_a = f.fundings) == null ? void 0 : _a.some((funding) => funding.accountId == userId);
      });
    case FEATURE_FILTER.DEVELOPED:
      return features.filter((f) => f.accountDevId == userId);
    case FEATURE_FILTER.ALL:
    default:
      return features;
  }
}
function filterByText(features, text) {
  if (!features) return [];
  if (!text) return features;
  const lowerText = text.toLowerCase();
  return features.filter(
    (feature) => feature.title.toLowerCase().includes(lowerText) || feature.description && feature.description.toLowerCase().includes(lowerText)
  );
}
function filterByStatus(features, status) {
  if (!features) return [];
  if (!status) return features;
  return features.filter((feature) => feature.status === status);
}
function sort(features, sort2) {
  if (!features) return [];
  if (!sort2) return features;
  return features.sort((a, b) => {
    let valueA = 0;
    let valueB = 0;
    switch (sort2) {
      case FEATURE_SORT.RECENT:
      case FEATURE_SORT.OLDEST:
        valueA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        valueB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        break;
      case FEATURE_SORT.RICHEST:
      case FEATURE_SORT.POOREST:
        valueA = a.fundings ? a.fundings.reduce((sum, f) => sum + (f.amount || 0), 0) : 0;
        valueB = b.fundings ? b.fundings.reduce((sum, f) => sum + (f.amount || 0), 0) : 0;
        break;
    }
    const descending = sort2 == FEATURE_SORT.RECENT || sort2 == FEATURE_SORT.RICHEST;
    return descending ? valueB - valueA : valueA - valueB;
  });
}
export {
  filterByAccount,
  filterByStatus,
  filterByText,
  sort
};
//# sourceMappingURL=utils-DwmyDldF.js.map
