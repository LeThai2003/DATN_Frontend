import { name } from '@/stores/reducers/followUpVisits/followUpVisit.reducer';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

const commonAction = getCommonActionsTypeByName(name);

export const getListFollowUpVisits = createAction(`${name}/GET_FOLLOW_UP_VISITS`, (state) => ({
    payload: state,
}));
