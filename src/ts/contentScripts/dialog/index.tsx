import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import ThesaurusApp from './containers/ThesaurusApp';

import { createDomAnchor } from '../../scripts/dom';

createDomAnchor('dialog-root');
const store = new Store();

store.ready().then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<ThesaurusApp />
		</Provider>
		, document.getElementById('dialog-root'));
});
