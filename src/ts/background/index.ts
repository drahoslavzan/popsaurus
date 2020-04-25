import { createStore } from 'redux';
import { wrapStore } from 'webext-redux';
import reducers from './store';
import { populate, loading } from './store/data/actions';
import ThesaurusApi from '../api/ThesaurusApi';

const store = createStore(reducers);
wrapStore(store);

chrome.runtime.onInstalled.addListener(function() {
	const api = new ThesaurusApi();

	chrome.contextMenus.create({
		title: "Synonyms for '%s'", 
		contexts:['selection'], 
		onclick: async function(info) {
			const text = info.selectionText;
			try {
				const dp = api.getDefinitions(text!);
				store.dispatch(loading());
				const defs = await dp;
				store.dispatch(populate(defs));
			} catch(e) {
				alert(`Error getting synonyms for ${text}`);
			}
		}
	});
});