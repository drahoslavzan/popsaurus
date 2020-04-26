import { Reducer} from 'redux';
import { DataActions } from './actions';
import { ISearchTerm } from '../../../api/ThesaurusApi';

export interface IData {
	loading: boolean;
	search: ISearchTerm | null;
}

const initialState: IData = {
	loading: false,
	search: null,
};

const reducer: Reducer<IData, DataActions> = (state = initialState, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'POPULATE':
			return { ...state, loading: false, search: payload as ISearchTerm };
		case 'LOADING':
			return { ...state, loading: payload as boolean };
		default:
			return state;
	}
};

export default reducer;
