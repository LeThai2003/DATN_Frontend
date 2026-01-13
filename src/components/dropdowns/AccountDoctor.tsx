import { initFilterWeekDay } from '@/defaultValues/weekDays/weekDay_default';
import { common, week_day } from '@/stores/reducers';
import { ModalType } from '@/types/stores/common';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { FaRegUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const AccountDoctor = ({ data }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleConfirmLogout = () => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.LOGOUT_CONFIRM,
                variant: 'view',
                data: null,
            })
        );
    };

    const handleDoctorModal = () => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.DOCTOR_VIEW_BY_THEM,
                variant: 'view',
                data: null,
            })
        );
    };

    const openModalShiftEmployee = () => {
        dispatch(
            week_day.actions.setFilterWeekDay({
                ...initFilterWeekDay,
                employeeIds: [data?.employeeId],
            })
        );
        dispatch(
            common.actions.setShowModal({
                type: ModalType.SHIFT_EMPLOYEE,
                variant: 'view',
                data: { ...data, isModalFromDoctor: true },
            })
        );
    };

    const openModalWorkShiftEmployee = () => {
        dispatch(
            common.actions.setShowModal({
                type: ModalType.WORK_SHIFT_DOCTOR,
                variant: 'view',
                data: { ...data },
            })
        );
    };

    // items
    const items: MenuProps['items'] = [
        {
            label: (
                <span onClick={handleDoctorModal} className="font-medium text-sm text-center">
                    Thông tin cá nhân
                </span>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <span onClick={openModalShiftEmployee} className="font-medium text-sm text-center">
                    Quản lý lịch mẫu
                </span>
            ),
            key: '1',
        },
        {
            label: (
                <span
                    onClick={openModalWorkShiftEmployee}
                    className="font-medium text-sm text-center"
                >
                    Quản lý lịch làm
                </span>
            ),
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Button
                    type="primary"
                    danger
                    block
                    className="menu-item-logout"
                    style={{ width: '120px' }}
                    onClick={handleConfirmLogout}
                >
                    Đăng xuất
                </Button>
            ),
            key: '3',
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            overlayClassName="!min-w-[125px]"
            placement="topRight"
            arrow
        >
            <a onClick={(e) => e.preventDefault()}>
                <div className="flex items-center justify-start gap-2 text-blue-600 p-2">
                    <FaRegUser className="size-4" />
                    <span className="text-xs font-medium">BS. {data?.fullName}</span>
                </div>
            </a>
        </Dropdown>
    );
};

export default AccountDoctor;
