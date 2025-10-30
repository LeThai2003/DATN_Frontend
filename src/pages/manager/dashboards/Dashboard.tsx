import {
    getCountAppointmentByDate,
    getCountServiceByDate,
    getFollowUpVisitsByDate,
} from '@/stores/actions/appointments/appointment.action';
import { getTotalRoom } from '@/stores/actions/managers/rooms/room.action';
import {
    selectCountAppointmentByDate,
    selectCountFollowUpVisitsByDate,
    selectCountServiceByDate,
    selectLoadingComponent,
} from '@/stores/selectors/appointments/appointment.selector';
import { selectTotalRooms } from '@/stores/selectors/rooms/room.selector';
import { UserOutlined, RedoOutlined, TeamOutlined } from '@ant-design/icons';
import { Row, Col, Card, Statistic, DatePicker, Spin, Empty } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const dispatch = useDispatch();
    const totalRooms = useSelector(selectTotalRooms);
    const countAppointmentsByDate = useSelector(selectCountAppointmentByDate);
    const countServicesByDate = useSelector(selectCountServiceByDate);
    const countFollowUpVisitsByDate = useSelector(selectCountFollowUpVisitsByDate);
    const loadingComponent = useSelector(selectLoadingComponent);

    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

    // mặc định từ đầu tháng đến hôm nay
    useEffect(() => {
        const start = dayjs().startOf('month');
        const end = dayjs();
        setDateRange([start, end]);
    }, []);

    // đổi khoảng ngày -> load dữ liệu
    useEffect(() => {
        if (!dateRange) return;

        // Gọi API khi có dateRange hợp lệ
        dispatch(getTotalRoom());
        dispatch(
            getCountAppointmentByDate({
                params: {
                    startDate: dayjs(dateRange[0]).format('YYYY-MM-DD'),
                    endDate: dayjs(dateRange[1]).format('YYYY-MM-DD'),
                },
            })
        );

        dispatch(
            getCountServiceByDate({
                params: {
                    startDate: dayjs(dateRange[0]).format('YYYY-MM-DD'),
                    endDate: dayjs(dateRange[1]).format('YYYY-MM-DD'),
                },
            })
        );

        dispatch(
            getFollowUpVisitsByDate({
                params: {
                    startDate: dayjs(dateRange[0]).format('YYYY-MM-DD'),
                    endDate: dayjs(dateRange[1]).format('YYYY-MM-DD'),
                },
            })
        );
    }, [dateRange]);

    const TotalAppointment = countAppointmentsByDate.reduce((sum, item) => sum + item.count, 0);

    const COLORS = [
        '#0088FE', // xanh dương sáng
        '#00C49F', // xanh ngọc
        '#FFBB28', // vàng tươi
        '#FF8042', // cam
        '#AA00FF', // tím đậm
        '#FF4C4C', // đỏ tươi
        '#4CAF50', // xanh lá cây
        '#FF66B2', // hồng pastel
        '#33CCCC', // xanh cyan
        '#9966FF', // tím nhạt
        '#FF9933', // cam nhạt
        '#0099CC', // xanh biển
        '#66CC66', // xanh lá nhạt
        '#CC3366', // hồng đậm
        '#999999', // xám trung tính
    ];

    console.log(countFollowUpVisitsByDate);

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
                                value={TotalAppointment || 0}
                                prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>

                    <Col span={12} xl={8}>
                        <Card className="border border-green-200" style={{ background: '#f6ffed' }}>
                            <Statistic
                                title="Tỷ lệ tái khám"
                                value={
                                    (countFollowUpVisitsByDate &&
                                        Math.ceil(
                                            (countFollowUpVisitsByDate?.completedFollowUpVisits /
                                                countFollowUpVisitsByDate?.totalFollowUpVisits) *
                                                100
                                        )) ||
                                    0
                                }
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
                                value={totalRooms}
                                prefix={<TeamOutlined style={{ color: '#eb2f96' }} />}
                                valueStyle={{ color: '#eb2f96' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <Spin spinning={loadingComponent} tip="Đang tải dữ liệu...">
                <Row gutter={[16, 16]}>
                    {/* Biểu đồ cột */}
                    <Col span={24} xl={24}>
                        <Card title="Số ca khám theo ngày">
                            {countAppointmentsByDate?.length === 0 && !loadingComponent ? (
                                <Empty description="Không có dữ liệu để hiển thị" />
                            ) : (
                                <ResponsiveContainer width="100%" height={310}>
                                    <BarChart data={countAppointmentsByDate}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={(date) => {
                                                const [y, m, d] = date.split('-');
                                                return `${d}-${m}-${y}`;
                                            }}
                                        >
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
                                        <Tooltip
                                            formatter={(value) => [`${value}`, 'Lượt khám']}
                                            labelFormatter={(label) => {
                                                const [y, m, d] = label.split('-');
                                                return `${d}-${m}-${y}`;
                                            }}
                                        />
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
                    <Col span={24} xl={24}>
                        <Card title="Phân bố ca khám theo phòng ban">
                            {countServicesByDate?.length === 0 && !loadingComponent ? (
                                <Empty description="Không có dữ liệu để hiển thị" />
                            ) : (
                                <ResponsiveContainer width="100%" height={310}>
                                    <PieChart>
                                        <Pie
                                            data={countServicesByDate as { [key: string]: any }[]}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={90}
                                            label={({ name, percent }) =>
                                                `${name} (${((percent as number) * 100).toFixed(
                                                    0
                                                )}%)`
                                            }
                                        >
                                            {countServicesByDate?.map((_, i) => (
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
