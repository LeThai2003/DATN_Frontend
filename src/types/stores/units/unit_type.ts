import { Filter, PageObject } from '../common';

export interface FilterUnit extends Filter {}

export interface Unit {
    unitId: number;
    name: string;
    descriptions?: string;
}

export interface UnitSlice {
    units: PageObject<Unit>;
    filter: FilterUnit;
    selectedUnit: Unit;
    loadingComponent: boolean;
}
