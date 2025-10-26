import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { deleteAllCookies, getCookies } from '@/utils/cookies/cookies';
import { selectEmployeeInfo } from '@/stores/selectors/employees/employee.selector';
import { useEffect } from 'react';
import { getInfo } from '@/stores/actions/managers/employees/employee.action';
import { logoutAction } from '@/stores/actions/auth/auth.action';

const Account = () => {
    // dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const infoEmployee = useSelector(selectEmployeeInfo);

    const user = JSON.parse(getCookies('user') || null);

    useEffect(() => {
        if (user && user?.authorities[0]?.authority == 'ROLE_ADMIN') {
            dispatch(getInfo({ username: user?.username }));
        }
    }, []);

    // event handling
    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/auths/login');
    };

    // items
    const items: MenuProps['items'] = [
        {
            label: (
                <Link to="/manager/account" className="menu-item-link">
                    <span className="font-medium">QL. {infoEmployee?.fullName}</span>
                </Link>
            ),
            key: '0',
        },
        // {
        //     label: (
        //         <Link to="#" className="menu-item-link">
        //             Lịch làm việc
        //         </Link>
        //     ),
        //     key: '1',
        // },
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
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <div className="mr-3 p-2 w-[40px] h-[40px] rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <FaRegUser className="size-5" />
                    </div>
                </Space>
            </a>
        </Dropdown>
    );
};

export default Account;
