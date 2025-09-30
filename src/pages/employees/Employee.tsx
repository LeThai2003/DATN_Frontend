import TabAccount from '@/components/pages/employees/TabAccount';
import TabRole from '@/components/pages/employees/TabRole';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

const Employee = () => {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Tài khoản" key="1">
                <TabAccount />
            </TabPane>

            <TabPane tab="Nhóm quyền" key="2">
                <TabRole />
            </TabPane>
        </Tabs>
    );
};

export default Employee;
