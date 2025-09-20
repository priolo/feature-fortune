
export enum MESSAGE_TYPE {
	INFO = "info",
	SUCCESS = "success",
	WARNING = "warn",
	ERROR = "error",
}

export interface Log {
	type?: MESSAGE_TYPE
	title?: string
	body: string
	data?: any
	targetId?: string
	receivedAt?: number
}