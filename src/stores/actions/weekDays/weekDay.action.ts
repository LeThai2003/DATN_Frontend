import { name } from '@/stores/reducers/weekDays/weekDay.reducer';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

const commonAction = getCommonActionsTypeByName(name);

export const createWeekDays = createAction(commonAction.create, (state) => ({ payload: state }));
