
export interface IMessage {
	id: number;
}

export interface IDialogMessage extends IMessage {
	dialog: 'OPEN' | 'CLOSE';
}

export const sendMessage = (message: IMessage) => {
	chrome.tabs.sendMessage(message.id, message);
}