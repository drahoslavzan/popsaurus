import { Reducer} from 'redux';
import { DataActions } from './actions';
import { ISearchTerm } from '../../../api/ThesaurusApi';
import { ISearchSentences } from '../../../api/YourDictionaryApi';

export interface IData {
	search: string;
	loading: boolean;
	audio: string | null;
	more: string | null;
	terms: ISearchTerm | null;
	sens: ISearchSentences | null;
}

const initialState: IData = {
	search: '',
	loading: false,
	audio: null,
	more: null,
	terms: null,
	sens: null,
};

const reducer: Reducer<IData, DataActions> = (state = initialState, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'POPULATE_TERM':
			const st = payload as ISearchTerm;
			return { ...state, loading: false, terms: st, audio: st.pronunciation?.audio, more: st.more };
		case 'POPULATE_SENS':
			const ss = payload as ISearchSentences;
			return { ...state, sens: ss, more: ss.more };
		case 'SEARCH':
			return { ...state, loading: true, terms: null, sens: null, audio: null, more: null, search: payload as string };
		default:
			return state;
	}
};

export default reducer;
