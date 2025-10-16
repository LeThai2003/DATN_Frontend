import { UserOutlined, RedoOutlined, TeamOutlined } from '@ant-design/icons';
import { Row, Col, Card, Statistic, DatePicker, Spin, Empty } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Label,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const { RangePicker } = DatePicker;

const Dashboard = () => {
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [departmentStats, setDepartmentStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const departments = ['Nội tổng quát', 'Tai mũi họng', 'Da liễu', 'Tim mạch', 'Nhi'];

    // mặc định từ đầu tháng đến hôm nay
    useEffect(() => {
        const start = dayjs().startOf('month');
        const end = dayjs();
        setDateRange([start, end]);
    }, []);

    // đổi khoảng ngày -> load dữ liệu
    useEffect(() => {
        if (dateRange) generateData();
    }, [dateRange]);

    const generateData = () => {
        setLoading(true);
        const timer = setTimeout(() => {
            const [start, end] = dateRange!;
            const days = end.diff(start, 'day') + 1;

            // giả lập không có dữ liệu nếu khoảng > 20 ngày
            if (days > 20) {
                setFilteredData([]);
                setDepartmentStats([]);
                setLoading(false);
                return;
            }

            const barData = Array.from({ length: days }, (_, i) => {
                const date = start.add(i, 'day');
                return {
                    date: date.format('DD/MM/YYYY'),
                    count: Math.floor(Math.random() * 25 + 5),
                };
            });

            const pieData = departments.map((name) => ({
                name,
                value: Math.floor(Math.random() * 100 + 10),
            }));

            setFilteredData(barData);
            setDepartmentStats(pieData);
            setLoading(false);
            clearTimeout(timer);
        }, 800); // giả lập API call
    };

    const stats = {
        total: filteredData.reduce((sum, item) => sum + item.count, 0),
        reExamRate: 22,
        departments: departments.length,
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="mt-1">Tổng quan phòng khám</h2>
                <RangePicker
                    value={dateRange}
                    onChange={(val) => setDateRange(val as [dayjs.Dayjs, dayjs.Dayjs])}
                    format="DD/MM/YYYY"
                />
            </div>

            {/* Thống kê tổng */}
            <div className="p-3 rounded-lg bg-white">
                <Row gutter={[16, 16]}>
                    <Col span={12} xl={8}>
                        <Card className="border border-blue-200" style={{ background: '#e6f7ff' }}>
                            <Statistic
                                title="Tổng ca khám"
                                value={stats.total}
                                prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>

                    <Col span={12} xl={8}>
                        <Card className="border border-green-200" style={{ background: '#f6ffed' }}>
                            <Statistic
                                title="Tỷ lệ tái khám"
                                value={stats.reExamRate}
                                suffix="%"
                                prefix={<RedoOutlined style={{ color: '#52c41a' }} />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Card>
                    </Col>

                    <Col span={12} xl={8}>
                        <Card className="border border-pink-200" style={{ background: '#fff0f6' }}>
                            <Statistic
                                title="Phòng ban hoạt động"
                                value={stats.departments}
                                prefix={<TeamOutlined style={{ color: '#eb2f96' }} />}
                                valueStyle={{ color: '#eb2f96' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <Spin spinning={loading} tip="Đang tải dữ liệu...">
                <Row gutter={[16, 16]}>
                    {/* Biểu đồ cột */}
                    <Col span={24} xl={16}>
                        <Card title="Số ca khám theo ngày">
                            {filteredData.length === 0 && !loading ? (
                                <Empty description="Không có dữ liệu để hiển thị" />
                            ) : (
                                <ResponsiveContainer width="100%" height={310}>
                                    <BarChart data={filteredData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date">
                                            <Label
                                                value="Ngày"
                                                offset={0}
                                                position="insideBottom"
                                            />
                                        </XAxis>
                                        <YAxis
                                            label={{
                                                value: 'Số ca khám',
                                                angle: -90,
                                                position: 'insideLeft',
                                            }}
                                        />
                                        <Tooltip />
                                        <Bar
                                            dataKey="count"
                                            fill="#1890ff"
                                            barSize={40}
                                            radius={[6, 6, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </Card>
                    </Col>

                    {/* Biểu đồ tròn */}
                    <Col span={24} xl={8}>
                        <Card title="Phân bố ca khám theo phòng ban">
                            {departmentStats.length === 0 && !loading ? (
                                <Empty description="Không có dữ liệu để hiển thị" />
                            ) : (
                                <ResponsiveContainer width="100%" height={310}>
                                    <PieChart>
                                        <Pie
                                            data={departmentStats}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={90}
                                            label={({ name, percent }) =>
                                                `${name} (${((percent as number) * 100).toFixed(
                                                    0
                                                )}%)`
                                            }
                                        >
                                            {departmentStats.map((_, i) => (
                                                <Cell
                                                    key={`cell-${i}`}
                                                    fill={COLORS[i % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
};

export default Dashboard;
