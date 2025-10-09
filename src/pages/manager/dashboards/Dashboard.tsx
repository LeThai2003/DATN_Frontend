import { UserOutlined, LineChartOutlined, RedoOutlined, TeamOutlined } from '@ant-design/icons';
import { Row, Col, Card, Statistic, Space, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
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

const { Option } = Select;

const Dashboard = () => {
    const [filterType, setFilterType] = useState<'day' | 'month' | 'year'>('month');
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [departmentStats, setDepartmentStats] = useState<any[]>([]);

    function CustomTooltip({ payload, label, active }) {
        if (active) {
            return (
                <div className="custom-tooltip bg-slate-400 p-3 rounded-md bg-opacity-70">
                    <p className="label">
                        {filterType == 'year' ? `Tháng: ${label}` : `Ngày: ${label}`}
                    </p>
                    <p className="label">{`Lượt khám: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    }

    useEffect(() => {
        generateData();
    }, [filterType, selectedDate]);

    const generateData = () => {
        let barData: any[] = [];
        let pieData: any[] = [];

        const departments = ['Nội tổng quát', 'Tai mũi họng', 'Da liễu', 'Tim mạch', 'Nhi'];

        if (filterType === 'year') {
            // 12 tháng
            barData = Array.from({ length: 12 }, (_, i) => ({
                date: `${i + 1}`,
                count: Math.floor(Math.random() * 200 + 100),
            }));

            pieData = departments.map((name) => ({
                name,
                value: Math.floor(Math.random() * 300 + 50),
            }));
        } else if (filterType === 'month') {
            const daysInMonth = selectedDate.daysInMonth();
            barData = Array.from({ length: daysInMonth }, (_, i) => ({
                date:
                    i >= 9
                        ? `${i + 1}/${selectedDate.month() + 1}/${selectedDate.year()}`
                        : `0${i + 1}/${selectedDate.month() + 1}/${selectedDate.year()}`,
                count: Math.floor(Math.random() * 20 + 5),
            }));

            pieData = departments.map((name) => ({
                name,
                value: Math.floor(Math.random() * 100 + 20),
            }));
        } else {
            barData = [
                {
                    date: selectedDate.format('DD/MM/YYYY'),
                    count: Math.floor(Math.random() * 40 + 10),
                },
            ];

            pieData = departments.map((name) => ({
                name,
                value: Math.floor(Math.random() * 30 + 5),
            }));
        }

        setFilteredData(barData);
        setDepartmentStats(pieData);
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

    const renderDatePicker = () => {
        switch (filterType) {
            case 'year':
                return (
                    <DatePicker
                        picker="year"
                        value={selectedDate}
                        onChange={(val) => setSelectedDate(val || dayjs())}
                    />
                );
            case 'month':
                return (
                    <DatePicker
                        picker="month"
                        value={selectedDate}
                        onChange={(val) => setSelectedDate(val || dayjs())}
                    />
                );
            default:
                return (
                    <DatePicker
                        value={selectedDate}
                        onChange={(val) => setSelectedDate(val || dayjs())}
                    />
                );
        }
    };

    const stats = {
        totalToday: filteredData.length
            ? filteredData?.reduce((sum, item) => (sum += item.count), 0)
            : 0,
        reExamRate: 22,
        departments: 5,
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="mt-1">Tổng quan phòng khám</h2>

                <div className="flex flex-wrap items-center gap-4">
                    <Select
                        value={filterType}
                        onChange={(v) => setFilterType(v)}
                        style={{ width: 150 }}
                        options={[
                            { label: 'Theo ngày', value: 'day' },
                            { label: 'Theo tháng', value: 'month' },
                            { label: 'Theo năm', value: 'year' },
                        ]}
                    />
                    {renderDatePicker()}
                </div>
            </div>

            <div className="p-3 rounded-lg bg-white">
                <Row gutter={[16, 16]}>
                    <Col span={12} xl={8}>
                        <Card
                            style={{
                                background: '#e6f7ff', // xanh nhạt
                            }}
                            className="border border-blue-200"
                        >
                            <Statistic
                                title="Tổng ca khám"
                                value={stats?.totalToday}
                                valueStyle={{ color: '#1890ff' }} // xanh
                                prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                            />
                        </Card>
                    </Col>

                    <Col span={12} xl={8}>
                        <Card
                            style={{
                                background: '#f6ffed', // xanh lá nhạt
                            }}
                            className="border border-green-200"
                        >
                            <Statistic
                                title="Tỷ lệ tái khám"
                                value={stats?.reExamRate}
                                suffix="%"
                                valueStyle={{ color: '#52c41a' }} // xanh lá
                                prefix={<RedoOutlined style={{ color: '#52c41a' }} />}
                            />
                        </Card>
                    </Col>

                    <Col span={12} xl={8}>
                        <Card
                            style={{
                                background: '#fff0f6', // hồng nhạt
                            }}
                            className="border border-pink-200"
                        >
                            <Statistic
                                title="Phòng ban hoạt động"
                                value={stats?.departments}
                                valueStyle={{ color: '#eb2f96' }} // hồng
                                prefix={<TeamOutlined style={{ color: '#eb2f96' }} />}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <Row gutter={[16, 16]}>
                {/* Biểu đồ cột */}
                <Col span={24} xl={16}>
                    <Card
                        title={
                            <>
                                Số ca khám theo{' '}
                                {filterType === 'day'
                                    ? 'ngày'
                                    : filterType === 'month'
                                    ? 'tháng'
                                    : 'năm'}
                            </>
                        }
                    >
                        <ResponsiveContainer width="100%" height={310}>
                            <BarChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date">
                                    <Label
                                        value={
                                            filterType === 'day'
                                                ? 'Ngày'
                                                : filterType === 'month'
                                                ? 'Tháng'
                                                : 'Năm'
                                        }
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
                                <Tooltip
                                    content={
                                        <CustomTooltip
                                            payload={undefined}
                                            label={undefined}
                                            active={undefined}
                                        />
                                    }
                                />
                                <Bar
                                    dataKey="count"
                                    fill="#1890ff"
                                    barSize={40}
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                {/* Biểu đồ tròn */}
                <Col span={24} xl={8}>
                    <Card title="Phân bố ca khám theo phòng ban">
                        <ResponsiveContainer width="100%" height={310}>
                            <PieChart>
                                <Pie
                                    data={departmentStats}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={90}
                                    label={({ name, percent }) =>
                                        `${name} (${((percent as number) * 100).toFixed(0)}%)`
                                    }
                                >
                                    {departmentStats.map((_, i) => (
                                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
