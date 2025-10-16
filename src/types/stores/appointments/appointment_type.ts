import { Filter, PageObject } from '../common';
import { Employee } from '../employees/employee_type';
import { Patient } from '../patients/patient_type';
import { Room } from '../rooms/room_type';
import { Service } from '../services/service_type';

export interface FilterAppointment extends Filter {
    patientId?: string[] | null;
    employeeId?: string[] | null;
}

export interface Appointment {
    appointmentId?: number;
    patientId: Patient;
    appointmentDate: string;
    appointmentTime: string;
    employeeId: Employee;
    serviceId: Service;
    roomDto?: Room;
    payments: number;
    price: number;
    transactionCode?: number;
    status?: string;
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
