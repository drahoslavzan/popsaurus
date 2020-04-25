import { Reducer} from 'redux';
import { DataActions } from './actions';
import { IDefinition } from '../../../api/ThesaurusApi';

export interface IData {
	loading: boolean,
	definitions: IDefinition[];
}

const initialState: IData = {
	loading: false,
	definitions: [],
};

const reducer: Reducer<IData, DataActions> = (state = initialState, action) => {
	const { payload } = action;
	switch (action.type) {
		case 'POPULATE':
			return { ...state, loading: false, definitions: payload as IDefinition[] };
		case 'LOADING':
			return { ...state, loading: payload as boolean };
		default:
			return state;
	}
};

export default reducer;
