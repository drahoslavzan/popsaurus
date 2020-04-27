import { createStore } from 'redux';
import { wrapStore } from 'webext-redux';
import reducers from './store';
import { search } from './store/data/actions';
import { IDialogMessage, sendMessage } from '../contentScripts/IMessage';

const store = createStore(reducers);
wrapStore(store);

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
		title: "PopSaurus: %s", 
		contexts:['selection'], 
		onclick: async function(info, tab) {
			const text = info.selectionText;
			if (!text) return;
			store.dispatch(search(text));
			sendMessage(<IDialogMessage>{ id: tab.id, dialog: 'OPEN' });
		}
	});
});