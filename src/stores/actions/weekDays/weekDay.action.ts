import { name } from '@/stores/reducers/weekDays/weekDay.reducer';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

const commonAction = getCommonActionsTypeByName(name);

export const createWeekDays = createAction(commonAction.create, (state) => ({ payload: state }));

export const getWeekDaysEmployee = createAction(`${name}/GET_WEEK_DAY_EMPOYEE`);

export const getWeekDayEmployeeDetail = createAction(
    `${name}/GET_WEEK_DAY_EMPOYEE_DETAIL`,
    (state) => ({
        payload: state,
    })
);

export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({ payload: state }));
