import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { deleteAllCookies, getCookies } from '@/utils/cookies/cookies';
import { fetchInfoPatient } from '@/stores/actions/patients/patient.action';
import { selectInfoPatient } from '@/stores/selectors/patients/patient.selector';
import { useEffect } from 'react';

const AccountPatient = ({ scrolled }) => {
    // dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const infoPatient = useSelector(selectInfoPatient);

    const user = JSON.parse(getCookies('user') || null);

    useEffect(() => {
        if (user && user?.authorities[0]?.authority == 'ROLE_PATIENT') {
            dispatch(fetchInfoPatient({ phone_number: user?.username }));
        }
    }, []);

    // event handling
    const handleLogout = () => {
        deleteAllCookies();
        navigate('/auths/login');
    };

    // items
    const items: MenuProps['items'] = [
        {
            label: (
                <Link to="/account" className="menu-item-link">
                    <span className="font-medium">{infoPatient?.fullName}</span>
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link to="/appointment-history" className="menu-item-link">
                    Lịch sử khám bệnh
                </Link>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Link to="/relatives-information" className="menu-item-link">
                    Thông tin người thân
                </Link>
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
                    onClick={handleLogout}
                >
                    Đăng xuất
                </Button>
            ),
            key: '3',
        },
    ];

    return (
        <div>
            {user && user?.authorities && user?.authorities[0]?.authority == 'ROLE_PATIENT' ? (
                <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                    <a onClick={(e) => e.preventDefault()}>Tài khoản</a>
                </Dropdown>
            ) : (
                <Link
                    to="/auths/login"
                    className={`hover:text-blue-600 transition-colors duration-300 ${
                        !scrolled && location.pathname === '/'
                            ? 'hover:text-blue-100 opacity-0'
                            : 'opacity-100'
                    }`}
                >
                    Đăng nhập
                </Link>
            )}
        </div>
    );
};

export default AccountPatient;
