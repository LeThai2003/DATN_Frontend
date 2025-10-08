import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';

const AccountPatient = () => {
    // dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // event handling
    const handleLogout = () => {
        console.log('logout');
        navigate('/auths/login');
    };

    // items
    const items: MenuProps['items'] = [
        {
            label: (
                <Link to="/account" className="menu-item-link">
                    Nguyễn Văn Name
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link to="/appointment-history" className="menu-item-link">
                    Lịch khám bệnh
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
        <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()}>Tài khoản</a>
        </Dropdown>
    );
};

export default AccountPatient;
