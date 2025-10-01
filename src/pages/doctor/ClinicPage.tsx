import { Layout, Menu, Card, Descriptions, Select, Table, Input, Button } from 'antd';
import { useState } from 'react';

const { Sider, Content } = Layout;

const patientsToday = [
    { id: 1, name: 'Nguyễn Văn A', age: 30 },
    { id: 2, name: 'Trần Thị B', age: 25 },
];

const pastVisits = {
    1: [{ date: '2025-09-01', note: 'Khám ho sốt' }],
    2: [{ date: '2025-09-10', note: 'Đau đầu' }],
};

export default function ClinicPage() {
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [selectedVisit, setSelectedVisit] = useState<any>(null);
    const [icd10, setIcd10] = useState<string>();
    const [prescriptions, setPrescriptions] = useState<any[]>([]);

    const columns = [
        {
            title: 'Tên thuốc',
            dataIndex: 'drug',
            render: (_, record, idx) => (
                <Input
                    value={record.drug}
                    onChange={(e) => {
                        const newData = [...prescriptions];
                        newData[idx].drug = e.target.value;
                        setPrescriptions(newData);
                    }}
                />
            ),
        },
        {
            title: 'Liều dùng',
            dataIndex: 'dose',
            render: (_, record, idx) => (
                <Input
                    value={record.dose}
                    onChange={(e) => {
                        const newData = [...prescriptions];
                        newData[idx].dose = e.target.value;
                        setPrescriptions(newData);
                    }}
                />
            ),
        },
    ];

    return (
        <Layout style={{ height: '100vh' }}>
            {/* SIDER */}
            <Sider width={300} style={{ background: '#fff', padding: 10 }}>
                <h3>Lịch khám hôm nay</h3>
                <Menu
                    items={patientsToday.map((p) => ({
                        key: p.id,
                        label: p.name,
                        onClick: () => setSelectedPatient(p),
                    }))}
                />
                {selectedPatient && (
                    <>
                        <h3>Các lần khám trước</h3>
                        <ul>
                            {pastVisits[selectedPatient.id]?.map((v, i) => (
                                <li
                                    key={i}
                                    style={{ cursor: 'pointer', color: 'blue' }}
                                    onClick={() => setSelectedVisit(v)}
                                >
                                    {v.date} - {v.note}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Sider>

            {/* CONTENT */}
            <Content style={{ padding: 20, background: '#f9f9f9' }}>
                {selectedPatient ? (
                    selectedVisit ? (
                        <>
                            {/* Hiển thị KẾT QUẢ KHÁM CŨ */}
                            <Card title={`Kết quả khám ngày ${selectedVisit.date}`}>
                                <p>
                                    <b>Ghi chú:</b> {selectedVisit.note}
                                </p>
                                <p>
                                    <b>ICD10:</b> {selectedVisit.icd10 || 'Chưa có'}
                                </p>
                                <p>
                                    <b>Đơn thuốc:</b>
                                </p>
                                <ul>
                                    {selectedVisit.prescriptions?.map((p: any, idx: number) => (
                                        <li key={idx}>
                                            {p.drug} - {p.dose}
                                        </li>
                                    )) || 'Không có'}
                                </ul>
                            </Card>
                            <Button type="link" onClick={() => setSelectedVisit(null)}>
                                ← Quay lại khám mới
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* FORM KHÁM MỚI */}
                            <Card title="Thông tin bệnh nhân" style={{ marginBottom: 16 }}>
                                <Descriptions bordered column={1}>
                                    <Descriptions.Item label="Họ tên">
                                        {selectedPatient.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tuổi">
                                        {selectedPatient.age}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>

                            <Card title="Kết quả khám" style={{ marginBottom: 16 }}>
                                <Input.TextArea rows={4} placeholder="Nhập kết quả khám..." />
                            </Card>

                            <Card title="Chỉ định (ICD10)" style={{ marginBottom: 16 }}>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Chọn mã ICD10"
                                    options={[
                                        { value: 'J06.9', label: 'Viêm đường hô hấp trên cấp' },
                                        { value: 'R51', label: 'Đau đầu' },
                                    ]}
                                />
                            </Card>

                            <Card title="Kê đơn thuốc">
                                <Button
                                    type="dashed"
                                    onClick={() =>
                                        setPrescriptions([...prescriptions, { drug: '', dose: '' }])
                                    }
                                >
                                    + Thêm thuốc
                                </Button>
                                <Table
                                    style={{ marginTop: 10 }}
                                    columns={columns}
                                    dataSource={prescriptions}
                                    rowKey={(_, idx) => idx.toString()}
                                    pagination={false}
                                />
                            </Card>
                        </>
                    )
                ) : (
                    <h3>Chọn bệnh nhân trong lịch khám để bắt đầu</h3>
                )}
            </Content>
        </Layout>
    );
}
