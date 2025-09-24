import { createAction } from '@reduxjs/toolkit';
import { getCommonActionsTypeByName } from './commonType.action';

const commonActions = getCommonActionsTypeByName('common');

export const firstFetch = createAction(commonActions.firstFetch, (state) => ({
    payload: state,
}));
