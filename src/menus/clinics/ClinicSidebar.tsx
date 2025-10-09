import { Menu } from 'antd';
import { Link, useLocation } from 'react-router';
import { clinicMenu } from './ClinicMenu';

function ClinicSidebar() {
    const role = 'manager';
    const location = useLocation();

    const currentKey = location.pathname.split('/')[2] || 'dashboard';

    const items = (clinicMenu[role] || []).map((item) => ({
        key: item.key,
        icon: item.icon,
        label: (
            <Link to={item.key == 'dashboard' ? `/${role}` : `/${role}/${item.key}`}>
                {item.label}
            </Link>
        ),
    }));

    return <Menu mode="inline" defaultSelectedKeys={[currentKey]} items={items} />;
}

export default ClinicSidebar;
