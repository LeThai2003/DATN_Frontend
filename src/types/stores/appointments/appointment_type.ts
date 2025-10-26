import { Filter, PageObject } from '../common';
import { Employee } from '../employees/employee_type';
import { Patient } from '../patients/patient_type';
import { Room } from '../rooms/room_type';
import { Service } from '../services/service_type';

export interface FilterAppointment extends Filter {
    patientId?: string[] | null;
    employeeId?: string[] | null;
    statuses?: string[] | null;
}

export interface Appointment {
    appointmentId?: string;
    patientId: Patient;
    employeeId: Employee;
    serviceId: Service;
    roomDto?: Room;
    payments: number;
    price: number;
    transactionCode?: number;
    status?: string;
    fullname: string;
    dob: string;
    gender: boolean;
    address: string;
    insuranceCode: string;
    emergencyContact: string;
    citizenId: string;
    job: string;
    phoneNumber: string;
    shiftId?: any;
}

export interface NewAppointment {
    fullName: string;
    dob: string;
    gender: boolean;
    address: string;
    insuranceCode: string;
    emergencyContact: string;
    citizenId: string;
    job: string;
    phoneNumber: string;
    appointmentDate: string;
    appointmentTime: string;
    employeeId: string;
    serviceId: string;
    price: number;
}

export interface PatientAppointment {
    patientId: string;
    fullName: string;
    phoneNumber: string;
    citizenId: string;
    insuranceCode?: string;
    job?: string;
    dob: string;
    gender: string;
    address: string;
    emergencyContact: string;
}

export interface DoctorAppointment {
    employeeId: number;
    fullname: string;
    avatar?: string;
    specialization_name?: string;
    room_name?: string;
    email?: string;
    dob?: string | Date;
    summary_profile?: string;
}

export interface TimeBooking {
    appointmentHour: string | Date;
}

interface Shift {
    shiftId?: string;
    shiftTimeId?: string;
    startTime?: string;
    endTime?: string;
}

export interface AppointmentSlice {
    appointments_doctor: PageObject<Appointment>;
    appointments_patient: PageObject<Appointment>;
    filter: FilterAppointment;
    selectedAppointment: Appointment;
    newAppointment: NewAppointment;
    patientAppointment?: PatientAppointment;
    doctorAppointment?: DoctorAppointment;
    timeBookingAppointment?: TimeBooking;
    shift: Shift;
    loadingComponent: boolean;
}
