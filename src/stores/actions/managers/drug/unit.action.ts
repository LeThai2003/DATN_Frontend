import { name } from "@/stores/reducers/units/unit.reducer";
import { getCommonActionsTypeByName } from "../../common/commonType.action";
import { createAction } from "@reduxjs/toolkit";

export const unitAction = getCommonActionsTypeByName(name);

export const fetchFirst = createAction(unitAction.firstFetch);

export const createUnitAction = createAction<any>(unitAction.create);

export const changePageAction = createAction<number>(unitAction.changePage);

export const updateUnitAction = createAction<any>(unitAction.update);

export const deleteUnitAction = createAction<number>(unitAction.delete);