export type MessageType = {
    id: string;
    message: string;
    status: 'success' | 'info' | 'error' | 'warning';
    hasShow: boolean;
};

export class Filter {
    pageNo?: number;
    pageSize?: number;
    search?: string;
    sort?: string;
    order?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface ModalState {
    data?: Record<string, any>;
    type?: ModalType;
    variant?: string;
}

export enum ModalType {
    DRUG = 'DRUG',
    UNIT = 'UNIT',
    DOSAGE_TIME = 'DOSAGE_TIME',
    MEAL_RELATION = 'MEAL_RELATION',
    ROLE = 'ROLE',
    EMPLOYEE = 'EMPLOYEE',
    EMPLOYEE_CLIENT = 'EMPLOYEE_CLIENT',
    ROOM = 'ROOM',
    SERVICE = 'SERVICE',
    SERVICE_PATIENT = 'SERVICE_PATIENT',
    SPECIALIZATION = 'SPECIALIZATION',
    PATIENT = 'PATIENT',
    APPOINTMENT_PATIENT = 'APPOINTMENT_PATIENT',
    APPOINTMENT_RECORD_CONFIRM = 'APPOINTMENT_RECORD_CONFIRM',
    LOGOUT_CONFIRM = 'LOGOUT_CONFIRM',
    DOCTOR_VIEW_BY_THEM = 'DOCTOR_VIEW_BY_THEM',
    RELATIVE_PATIENT = 'RELATIVE_PATIENT',
    SHIFT_TIME = 'SHIFT_TIME',
    SHIFT_EMPLOYEE = 'SHIFT_EMPLOYEE',
    CONFIRM_SAVE_RECORD = 'CONFIRM_SAVE_RECORD',
    ACCEPT_PRESCRIPTION_SUGGEST = 'ACCEPT_PRESCRIPTION_SUGGEST',
}

export interface CommonType {
    messageQueue: MessageType[];
    loadingPage: boolean;
    modal: ModalState[];
}

export interface PageObject<T> {
    data: T[];
    totalPage: number;
    loadingPage: boolean;
}
