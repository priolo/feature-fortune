import { Account } from "@/types/Account";
import { Message } from "@/types/Message"



export function removeDuplicate<T>(
	items: T[],
	fnGetId: (item: T) => string = (item: any) => item.id,
): T[] {
	const acc = new Map<string, T>();
	for (const item of items) {
		const id = fnGetId(item)
		if (id == null || acc.has(id)) continue
		acc.set(id, item)
	}
	return Array.from(acc.values())
}

export function getAllSenders(messages: Message[]): Account[] {
	const acc = new Map<string, Account>();
	for (const message of messages) {
		const content = message.content;
		const accountId = content?.accountId ?? content?.account?.id;
		if (!accountId || acc.has(accountId)) continue;
		acc.set(accountId, content?.account)
	}
	return Array.from(acc.values())
		.sort((acc1, acc2) => acc1.name.localeCompare(acc2.name));
}

// export function filterByReceiver(messages: Message[], receierId: string): Feature[] {

// 	if (!features) return []
// 	if (!filter || !userId) return features

// 	switch (filter) {
// 		case FEATURE_FILTER.MY:
// 			return features.filter(feature => feature.accountId == userId)
// 		case FEATURE_FILTER.FINANCED:
// 			return features.filter(f => f.fundings?.some(funding => funding.accountId == userId))
// 		case FEATURE_FILTER.DEVELOPED:
// 			return features.filter(f => f.accountDevId == userId)
// 		case FEATURE_FILTER.ALL:
// 		default:
// 			return features
// 	}
// }