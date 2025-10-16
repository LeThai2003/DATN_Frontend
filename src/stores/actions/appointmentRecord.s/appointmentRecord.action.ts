import { createAction } from '@reduxjs/toolkit';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { name } from '@/stores/reducers/appointmentRecords/appointmentRecord.reducer';

export const appointmentRecordAction = getCommonActionsTypeByName(name);

export const getAppointmentRecord = createAction(`${name}/GET_APPOINTMENT_RECORD`, (state) => ({
    payload: state,
}));

export const loadingPage = createAction(`${name}/LOAD_PAGE`);
