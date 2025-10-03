import { Filter, PageObject } from '../common';

export interface FilterService extends Filter {}

export interface Service {
    service_id: number;
    name: string;
    description?: string;
    price: number;
    image?: string;
    doctors?: any[]; // Employee
}

export interface ServiceSlice {
    services: PageObject<Service>;
    filter: FilterService;
    selectedService: Service;
    loadingComponent: boolean;
}
