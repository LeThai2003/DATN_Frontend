import { FilterUnit, UnitSlice } from '@/types/stores/units/unit_type';
import { initFilterValue } from '../common/common';

export const initFilterUnit: FilterUnit = {
    ...initFilterValue,
    sort: 'unitId',
};

export const initUnitSlice: UnitSlice = {
    units: {
        data: [],
        totalPage: 0,
        loadingPage: false,
    },
    filter: initFilterUnit,
    selectedUnit: null,
    loadingComponent: false,
};
