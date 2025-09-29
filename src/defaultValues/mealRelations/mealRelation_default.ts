import {
    FilterMealRelation,
    MealRelationSlice,
} from '@/types/stores/mealRelations/mealRelation_type';
import { initFilterValue } from '../common/common';

export const initFilterMealRelation: FilterMealRelation = {
    ...initFilterValue,
};

export const initMealRelationSlice: MealRelationSlice = {
    mealRelations: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterMealRelation,
    selectedMealRelation: null,
    loadingComponent: false,
};
