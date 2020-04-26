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

chrome.runtime.onMessage.addListener(async function(request: IDialogMessage) {
	switch(request.dialog) {
	case 'OPEN':
		removeDomAnchor(id);
		const elem = createDomAnchor(id, 'b9a35604-4a32-4a0b-80e5-2ff7a7e67e9a');
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