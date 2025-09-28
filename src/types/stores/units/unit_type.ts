import { Filter, PageObject } from '../common';

export interface FilterUnit extends Filter {}

export interface Unit {
    unit_id: number;
    name: string;
    descriptions?: string;
}

export interface UnitSlice {
    units: PageObject<Unit>;
    filter: FilterUnit;
    selectedUnit: Unit;
    loadingComponent: boolean;
}
