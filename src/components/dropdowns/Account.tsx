import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';

const Account = () => {
    // dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // event handling
    const handleLogout = () => {
        navigate('/auths/login');
    };

    // items
    const items: MenuProps['items'] = [
        {
            label: (
                <Link to="/manager/account" className="menu-item-link">
                    Quản lý
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link to="#" className="menu-item-link">
                    Lịch làm việc
                </Link>
            ),
            key: '1',
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
