import { Action } from 'redux';
import { IDefinition } from '../../../api/ThesaurusApi';

export type PopulatePayload = IDefinition[];

export type DataActions = Action<'POPULATE', PopulatePayload> | Action<'LOADING', boolean>;

export const populate = (payload: PopulatePayload) => ({ type: 'POPULATE', payload });
export const loading = () => ({ type: 'LOADING', payload: true });
