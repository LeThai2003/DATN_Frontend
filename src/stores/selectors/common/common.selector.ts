import { name } from '@/stores/reducers/common/common.reducer';
import { CommonType, MessageType, ModalState } from '@/types/stores/common';
import { createSelector } from '@reduxjs/toolkit';

export const selectState = (state: any) => state[name];

export const selectCommon = createSelector(selectState, (state: CommonType) => state);

export const selectMessageQueue = createSelector(
    selectState,
    (state: CommonType): MessageType[] => state.messageQueue
);

export const selectLoading = createSelector(
    selectState,
    (state: CommonType): boolean => state.loadingPage
);

export const selectModal = createSelector(
    selectState,
    (state: CommonType): ModalState[] => state.modal
);
