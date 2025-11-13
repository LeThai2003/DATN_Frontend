import { Filter, PageObject } from '@/types/stores/common';

export interface FilterMealRelation extends Filter {}

export interface MealRelation {
    relationsId: number;
    name: string;
    description: string;
}

export interface MealRelationSlice {
    mealRelations: PageObject<MealRelation>;
    filter: FilterMealRelation;
    selectedMealRelation: MealRelation;
    loadingComponent: boolean;
}
