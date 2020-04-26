import { Action } from 'redux';
import { ISearchTerm } from '../../../api/ThesaurusApi';

export type DataActions = Action<'POPULATE', ISearchTerm> | Action<'LOADING', boolean>;

export const populate = (payload: ISearchTerm) => ({ type: 'POPULATE', payload });
export const loading = () => ({ type: 'LOADING', payload: true });
