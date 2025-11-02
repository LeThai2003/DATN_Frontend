import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import TabShiftTime from './TabShiftTime';
import TabShiftEmployee from './TabShiftEmployee';

const Shift = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Mẫu lịch làm" key="1">
                    <TabShiftEmployee />
                </TabPane>
                <TabPane tab="Thời gian" key="2">
                    <TabShiftTime />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Shift;
