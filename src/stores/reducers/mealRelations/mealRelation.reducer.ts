import { initMealRelationSlice } from '@/defaultValues/mealRelations/mealRelation_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'meal_relations';

const MealRelationSlice = createSlice({
    name,
    initialState: initMealRelationSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.mealRelations.loadingPage = payload;
        },
        setMealRelations(state, { payload }: PayloadAction<any>) {
            state.mealRelations.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.mealRelations.totalPage = payload;
        },
        setFilterMealRealtions(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectMealRelation(state, { payload }: PayloadAction<any>) {
            state.selectedMealRelation = payload;
        },
        setPageNo(state, {payload} : PayloadAction<number>) {
            state.filter.pageNo = payload;
        }
    },
});

export const { actions } = MealRelationSlice;
export default MealRelationSlice;
