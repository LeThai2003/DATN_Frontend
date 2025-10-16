import React, { useState } from 'react';
import { Table, Checkbox, Button, Space, Typography } from 'antd';

const { Title } = Typography;

interface TimeSlot {
    label: string;
    checked: boolean;
}

interface DoctorSchedule {
    doctorId: string;
    name: string;
    morning: TimeSlot[];
    afternoon: TimeSlot[];
}

function generateSlots(start: string, end: string, stepMinutes = 30): string[] {
    const slots: string[] = [];
    let [hour, minute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    while (hour < endHour || (hour === endHour && minute < endMinute)) {
        const nextMinute = minute + stepMinutes;
        let nextHour = hour + Math.floor(nextMinute / 60);
        const nextM = nextMinute % 60;
        slots.push(
            `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} - ${String(
                nextHour
            ).padStart(2, '0')}:${String(nextM).padStart(2, '0')}`
        );
        hour = nextHour;
        minute = nextM;
    }

    return slots;
}

const morningSlots = generateSlots('07:00', '11:30');
const afternoonSlots = generateSlots('13:00', '17:30');

const Schedule: React.FC = () => {
    const [schedules, setSchedules] = useState<DoctorSchedule[]>([
        {
            doctorId: '1',
            name: 'BS. Nguyễn Văn A',
            morning: morningSlots.map((s) => ({ label: s, checked: false })),
            afternoon: afternoonSlots.map((s) => ({ label: s, checked: false })),
        },
        {
            doctorId: '2',
            name: 'BS. Trần Thị B',
            morning: morningSlots.map((s) => ({ label: s, checked: false })),
            afternoon: afternoonSlots.map((s) => ({ label: s, checked: false })),
        },
    ]);

    const handleToggle = (doctorId: string, period: 'morning' | 'afternoon', idx: number) => {
        setSchedules((prev) =>
            prev.map((d) =>
                d.doctorId === doctorId
                    ? {
                          ...d,
                          [period]: d[period].map((slot, i) =>
                              i === idx ? { ...slot, checked: !slot.checked } : slot
                          ),
                      }
                    : d
            )
        );
    };

    const handleAuto = (doctorId: string) => {
        setSchedules((prev) =>
            prev.map((d) =>
                d.doctorId === doctorId
                    ? {
                          ...d,
                          morning: d.morning.map((s) => ({ ...s, checked: true })),
                          afternoon: d.afternoon.map((s) => ({ ...s, checked: true })),
                      }
                    : d
            )
        );
    };

    const columns = [
        {
            title: 'Bác sĩ',
            dataIndex: 'name',
            key: 'name',
            width: 180,
            render: (name: string, record: DoctorSchedule) => (
                <Space direction="vertical">
                    <span style={{ fontWeight: 600 }}>{name}</span>
                    <Button size="small" onClick={() => handleAuto(record.doctorId)}>
                        Mặc định
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Sáng (07:00 - 11:30)',
            key: 'morning',
            render: (record: DoctorSchedule) => (
                <Space wrap>
                    {record.morning.map((slot, idx) => (
                        <Checkbox
                            key={idx}
                            checked={slot.checked}
                            onChange={() => handleToggle(record.doctorId, 'morning', idx)}
                        >
                            {slot.label}
                        </Checkbox>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Chiều (13:00 - 17:30)',
            key: 'afternoon',
            render: (record: DoctorSchedule) => (
                <Space wrap>
                    {record.afternoon.map((slot, idx) => (
                        <Checkbox
                            key={idx}
                            checked={slot.checked}
                            onChange={() => handleToggle(record.doctorId, 'afternoon', idx)}
                        >
                            {slot.label}
                        </Checkbox>
                    ))}
                </Space>
            ),
        },
    ];

    return (
        <div className="relative p-2 bg-white rounded-lg flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Quản lý thời gian làm việc của bác sĩ</h3>
            <Table
                dataSource={schedules}
                columns={columns}
                rowKey="doctorId"
                pagination={false}
                bordered
            />
        </div>
    );
};

export default Schedule;
