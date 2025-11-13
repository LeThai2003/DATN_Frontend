import { name } from '@/stores/reducers/drugs/drug.reducer';
import { getCommonActionsTypeByName } from '../../common/commonType.action';
import { createAction } from '@reduxjs/toolkit';

export const drugAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(drugAction.firstFetch);

export const getDrugsSelect = createAction(`${name}/GET_DRUGS_SELECT`);

export const createDrugAction = createAction<any>(drugAction.create);

export const changePageAction = createAction<number>(drugAction.changePage);

export const updateDrugAction = createAction<any>(drugAction.update);

export const deleteDrugAction = createAction<number>(drugAction.delete);
