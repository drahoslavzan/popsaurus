import { combineReducers } from 'redux';
import data, { IData } from './data/reducer';
import settings, { IAppSettings } from './settings/reducer';
import 'redux';

// Enhance the Action interface with the option of a payload.
// While still importing the Action interface from redux.
declare module 'redux' {
	export interface Action<T = any, P = any> {
		type: T;
		payload?: P;
	}
}

export interface IAppState {
	data: IData;
	settings: IAppSettings;
}

const reducers = combineReducers<IAppState>({
	data,
	settings,
});

export default reducers;
