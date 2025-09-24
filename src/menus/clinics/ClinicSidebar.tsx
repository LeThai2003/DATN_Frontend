import { Menu } from 'antd';
import { Link } from 'react-router';
import { clinicMenu } from './ClinicMenu';

function ClinicSidebar() {
    const role = 'manager';

    const items = (clinicMenu[role] || []).map((item) => ({
        key: item.key,
        icon: item.icon,
        label: <Link to={`/${role}/${item.key}`}>{item.label}</Link>,
    }));

    return <Menu mode="inline" defaultSelectedKeys={['dashboard']} items={items} />;
}

export default ClinicSidebar;
