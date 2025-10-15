import { name } from "@/stores/reducers/mealRelations/mealRelation.reducer";
import { getCommonActionsTypeByName } from "../../common/commonType.action";
import { createAction } from "@reduxjs/toolkit";

export const mealRelationAction = getCommonActionsTypeByName(name);

export const fetchFirstMealRelation = createAction(mealRelationAction.firstFetch);

export const createMealRelationAction = createAction<any>(mealRelationAction.create);

export const updateMealRelationAction = createAction<any>(mealRelationAction.update);

export const deleteMealRelationAction = createAction<number>(mealRelationAction.delete);

export const changePageMealAction = createAction<number>(mealRelationAction.changePage);