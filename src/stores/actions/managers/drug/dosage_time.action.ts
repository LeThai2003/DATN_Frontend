import { name } from "@/stores/reducers/dosageTimes/dosageTime.reducer";
import { getCommonActionsTypeByName } from "../../common/commonType.action";
import { createAction } from "@reduxjs/toolkit";

export const dosageTimeAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(dosageTimeAction.firstFetch);

export const createDosageTimeAction = createAction<any>(dosageTimeAction.create);

export const changePageAction = createAction<number>(dosageTimeAction.changePage);

export const updateDosageTimeAction = createAction<any>(dosageTimeAction.update);

export const deleteDosageTimeAction = createAction<number>(dosageTimeAction.delete);
