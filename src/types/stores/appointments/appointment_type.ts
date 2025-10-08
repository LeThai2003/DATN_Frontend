import { Filter, PageObject } from '../common';

export interface FilterAppointment extends Filter {}

export interface Appointment {
    appointment_id?: number;
    patient_id: number;
    appointment_date: string | Date;
    appointment_hour: string | Date;
    employee_id: number;
    service_id: number;
    payment_id: number;
    price: number;
    transaction_code?: number;
    status: string;
}

export interface PatientAppointment {
    fullname: string;
    phone_number: string;
    citizen_id: string;
    insurance_code?: string;
    job?: string;
    dob: string;
    gender: string;
    address: string;
    emergency_contact: string;
}

export interface DoctorAppointment {
    employee_id: number;
    fullname: string;
    avatar?: string;
    specialization_name?: string;
    room_name?: string;
    email?: string;
    dob?: string | Date;
    summary_profile?: string;
}

export interface TimeBooking {
    appointment_hour: string | Date;
}

export interface AppointmentSlice {
    appointments: PageObject<Appointment>;
    filter: FilterAppointment;
    selectedAppointment: Appointment;
    newAppointment: Appointment;
    patientAppointment?: PatientAppointment;
    doctorAppointment?: DoctorAppointment;
    timeBookingAppointment?: TimeBooking;
    loadingComponent: boolean;
}
