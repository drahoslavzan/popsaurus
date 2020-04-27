import React from 'react';
import { v4 as uuid } from 'uuid';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled, { StyleSheetManager } from 'styled-components';
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
					<Body>
						<App onClose={() => {
							ReactDOM.unmountComponentAtNode(elem);
							removeDomAnchor(id);
						}} />
					</Body>
				</Provider>
			</StyleSheetManager>
			, elem);
		break;
	case 'CLOSE':
		removeDomAnchor(id);
		break;
	}
});

const Body = styled('div')`
	font-family: sans-serif;
	font-size: 15px;
	color: black;
`;
