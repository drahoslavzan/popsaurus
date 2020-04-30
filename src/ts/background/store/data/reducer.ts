import { Reducer} from 'redux';
import { DataActions } from './actions';
import { ISearchTerm } from '../../../api/ThesaurusApi';
import { ISearchSentences } from '../../../api/YourDictionaryApi';

export interface IData {
	search: string;
	loading: boolean;
	audio: string | null;
	term: ISearchTerm | null;
	sen: ISearchSentences | null;
}

const initialState: IData = {
	search: '',
	loading: false,
	audio: null,
	term: null,
	sen: null,
};

const reducer: Reducer<IData, DataActions> = (state = initialState, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'POPULATE_TERM':
			const st = payload as ISearchTerm;
			return { ...state, loading: false, term: st, audio: st.pronunciation?.audio };
		case 'POPULATE_SENS':
			const ss = payload as ISearchSentences;
			return { ...state, sen: ss };
		case 'SEARCH':
			return { ...state, loading: true, term: null, sen: null, audio: null, more: null, search: payload as string };
		default:
			return state;
	}
};

export default reducer;
