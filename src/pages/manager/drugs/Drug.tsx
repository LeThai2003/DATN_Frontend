import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import TabTime from '@/components/pages/drugs/TabTime';
import TabDrug from '@/components/pages/drugs/TabDrug';
import TabUnit from '@/components/pages/drugs/TabUnit';

const Drug = () => {
    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Thuốc" key="1">
                    <TabDrug />
                </TabPane>

                <TabPane tab="Đơn vị thuốc" key="2">
                    <TabUnit />
                </TabPane>

                <TabPane tab="Thời điểm uống thuốc" key="3">
                    <TabTime />
                </TabPane>
            </Tabs>
        </>
    );
};

export default Drug;
