import { initUnitSlice } from '@/defaultValues/units/unit_default';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'unit';

const UnitSlice = createSlice({
    name,
    initialState: initUnitSlice,
    reducers: {
        setLoadingPage(state, { payload }: PayloadAction<any>) {
            state.units.loadingPage = payload;
        },
        setUnits(state, { payload }: PayloadAction<any>) {
            state.units.data = payload;
        },
        setTotalPage(state, { payload }: PayloadAction<any>) {
            state.units.totalPage = payload;
        },
        setFilterUnit(state, { payload }: PayloadAction<any>) {
            state.filter = payload;
        },
        setLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setSelectUnit(state, { payload }: PayloadAction<any>) {
            state.selectedUnit = payload;
        },
        setPageNo(state, {payload} : PayloadAction<any>){
            state.filter.pageNo = payload;
        }
    },
});

export const { actions } = UnitSlice;
export default UnitSlice;
