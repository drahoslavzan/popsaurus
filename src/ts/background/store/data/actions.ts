import { Action } from 'redux';
import { ISearchTerm } from '../../../api/ThesaurusApi';
import { ISearchSentences } from '../../../api/YourDictionaryApi';

export type DataActions = Action<'SEARCH', string> | Action<'POPULATE_TERM', ISearchTerm> | Action<'POPULATE_SENS', ISearchSentences>;

export const populateTerm = (payload: ISearchTerm) => ({ type: 'POPULATE_TERM', payload });
export const populateSens = (payload: ISearchSentences) => ({ type: 'POPULATE_SENS', payload });
export const search = (word: string) => ({ type: 'SEARCH', payload: word });
