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
    ROOM = 'ROOM',
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
