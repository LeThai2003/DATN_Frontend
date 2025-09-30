import { AiOutlineDashboard } from 'react-icons/ai';
import { FaPills, FaUserNurse, FaUserInjured } from 'react-icons/fa';
import {
    MdOutlineCategory,
    MdOutlineLocalHospital,
    MdOutlineMedicalServices,
    MdOutlineManageAccounts,
    MdOutlineCalendarToday,
    MdOutlineReceiptLong,
} from 'react-icons/md';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { IoCalendarOutline } from 'react-icons/io5';

export const clinicMenu = {
    manager: [
        {
            key: 'dashboard',
            label: 'Tổng quan',
            icon: <AiOutlineDashboard />,
        },
        {
            key: 'drugs',
            label: 'Quản lý thuốc',
            icon: <FaPills />,
        },
        {
            key: 'departments',
            label: 'Quản lý chuyên khoa',
            icon: <MdOutlineCategory />,
        },
        {
            key: 'rooms',
            label: 'Quản lý phòng khám',
            icon: <MdOutlineLocalHospital />,
        },
        {
            key: 'services',
            label: 'Quản lý dịch vụ',
            icon: <MdOutlineMedicalServices />,
        },
        {
            key: 'employees',
            label: 'Quản lý bác sĩ',
            icon: <FaUserNurse />,
        },
        {
            key: 'patients',
            label: 'Quản lý bệnh nhân',
            icon: <FaUserInjured />,
        },
        // {
        //     key: 'work_shifts',
        //     label: 'Lịch làm / Ca trực',
        //     icon: <MdOutlineCalendarToday />,
        // },
        {
            key: 'accounts',
            label: 'Tài khoản cá nhân',
            icon: <MdOutlineManageAccounts />,
        },
    ],

    doctor: [
        {
            key: 'appointments',
            label: 'Lịch hẹn',
            icon: <IoCalendarOutline />,
        },
        {
            key: 'queue',
            label: 'Thứ tự lịch khám',
            icon: <HiOutlineClipboardList />,
        },
        {
            key: 'shift_assignments',
            label: 'Lịch trình làm việc',
            icon: <MdOutlineCalendarToday />,
        },
        {
            key: 'accounts',
            label: 'Tài khoản cá nhân',
            icon: <MdOutlineManageAccounts />,
        },
    ],

    nurse: [
        {
            key: 'queue',
            label: 'Thứ tự lịch khám',
            icon: <HiOutlineClipboardList />,
        },
        {
            key: 'invoices',
            label: 'Hóa đơn',
            icon: <MdOutlineReceiptLong />,
        },
        {
            key: 'shift_assignments',
            label: 'Lịch trình làm việc',
            icon: <MdOutlineCalendarToday />,
        },
        {
            key: 'accounts',
            label: 'Tài khoản cá nhân',
            icon: <MdOutlineManageAccounts />,
        },
    ],
};
