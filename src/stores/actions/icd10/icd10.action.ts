import { name } from '@/stores/reducers/icd10/icd10.reducer';
import { getCommonActionsTypeByName } from '../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

const commonAction = getCommonActionsTypeByName(name);

export const getIcd10 = createAction(`${name}/GET_LIST_ICD10`, (state) => ({ payload: state }));
