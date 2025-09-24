import { initCommonValue } from '@/defaultValues/common/common';
import { CommonType } from '@/types/stores/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'common';

const addMessage = (
    state: CommonType,
    message: string,
    status: 'success' | 'info' | 'error' | 'warning'
) => {
    state.messageQueue.push({
        id: Date.now().toString(),
        message: message,
        status: status,
        hasShow: false,
    });
};

const commonSlice = createSlice({
    name,
    initialState: initCommonValue,
    reducers: {
        removeMessageQueue(state, { payload }: PayloadAction<string>) {
            state.messageQueue = state.messageQueue.filter((i) => i.id != payload);
        },
        markMessageAsShown(state, { payload }: PayloadAction<string>) {
            const message = state.messageQueue.find((msg) => msg.id == payload);
            if (message) {
                message.hasShow = true;
            }
        },
        setErrorMessage(state, action: PayloadAction<string>) {
            addMessage(state, action.payload, 'error');
        },
        setSuccessMessage(state, action: PayloadAction<string>) {
            addMessage(state, action.payload, 'success');
        },
        setWarningMessage(state, action: PayloadAction<string>) {
            addMessage(state, action.payload, 'warning');
        },
        setNotificationMessage(state, action: PayloadAction<string>) {
            addMessage(state, action.payload, 'info');
        },
        setLoading(state, { payload }: PayloadAction<boolean>) {
            state.loadingPage = payload;
        },
        setShowModal(state, { payload }: PayloadAction<any>) {
            state.modal.push(payload);
        },
        setHiddenModal(state, { payload }: PayloadAction<any>) {
            state.modal = state.modal.filter((m) => m.type != payload);
        },
    },
});

export const { actions } = commonSlice;

export default commonSlice;
