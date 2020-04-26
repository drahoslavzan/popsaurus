import React from 'react';
import { v4 as uuid } from 'uuid';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StyleSheetManager } from 'styled-components';
import { Store } from 'webext-redux';
import App from './containers/App';
import { IDialogMessage } from '../IMessage';
import { createDomAnchor, removeDomAnchor } from '../../scripts/dom';

const id = uuid();
const store = new Store();
const styles = chrome.extension.getURL('styles.css');

chrome.runtime.onMessage.addListener(async function(request: IDialogMessage) {
	switch(request.dialog) {
	case 'OPEN':
		removeDomAnchor(id);
		const root = createDomAnchor(id, styles);
		const innerStyles = document.createElement('div');
		const elem = document.createElement('div');
		root.appendChild(innerStyles);
		root.appendChild(elem);
		await store.ready();
		ReactDOM.render(
			<StyleSheetManager target={innerStyles}>
				<Provider store={store}>
					<App onClose={() => removeDomAnchor(id)} />
				</Provider>
			</StyleSheetManager>
			, elem);
		break;
	case 'CLOSE':
		removeDomAnchor(id);
		break;
	}
});