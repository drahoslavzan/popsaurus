import React from 'react';
import { v4 as uuid } from 'uuid';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import App from './containers/App';
import { IDialogMessage } from './IMessage';
import { createDomAnchor, removeDomAnchor } from '../../scripts/dom';

const id = uuid();
const store = new Store();
const styles = chrome.extension.getURL('styles.css');

chrome.runtime.onMessage.addListener(async function(request: IDialogMessage) {
	switch(request.dialog) {
	case 'OPEN':
		removeDomAnchor(id);
		const elem = createDomAnchor(id, styles);
		await store.ready();
		ReactDOM.render(
			<Provider store={store}>
				<App dialogId={id} />
			</Provider>
			, elem);
		break;
	case 'CLOSE':
		removeDomAnchor(id);
		break;
	}
});