import SectionAppointmentRecord from '@/components/pages/doctors/SectionAppointmentRecord';
import SectionInfoPatient from '@/components/pages/doctors/SectionInfoPatient';
import SectionPrescription from '@/components/pages/doctors/SectionPrescription';
import { selectSelectedAppointmentRecord } from '@/stores/selectors/appointmentRecords/appointmentRecord.selector';
import { selectSelectedPatient } from '@/stores/selectors/patients/patient.selector';
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const Doctor = () => {
    const selectedPatient = useSelector(selectSelectedPatient);
    const selectedAppointmentRecord = useSelector(selectSelectedAppointmentRecord);

    return (
        <div>
            {selectedPatient !== null ? (
                <div className="h-[92%] overflow-y-auto">
                    {!selectedAppointmentRecord && (
                        <div className="mb-3 flex justify-between sticky top-0 left-0 bg-blue-100 py-3 px-5 rounded-md z-10">
                            <h2>Buổi khám mới</h2>
                            <Button type="primary">Lưu kết quả khám</Button>
                        </div>
                    )}
                    <div className="flex flex-col gap-5 pb-3">
                        <SectionInfoPatient />
                        <SectionAppointmentRecord />
                        <SectionPrescription drugOptions={[]} unitOptions={[]} />
                    </div>
                </div>
            ) : (
                <div>
                    <h3>Chọn bệnh nhân trong lịch khám để bắt đầu</h3>
                </div>
            )}
        </div>
    );
};

export default Doctor;

// import { Card, Descriptions, Select, Table, Button, Input } from 'antd';
// import { useState } from 'react';

// const drugs = [
//     { drug_id: 1, name: 'Paracetamol 500mg', unit: 'Viên', instructions: 'Uống sau ăn' },
//     { drug_id: 2, name: 'Amoxicillin 500mg', unit: 'Viên', instructions: 'Uống trước ăn' },
//     { drug_id: 3, name: 'Vitamin C 500mg', unit: 'Viên', instructions: 'Uống buổi sáng' },
// ];

// const prescriptions = {
//     1: [
//         { drug_id: 1, dosage: '2 viên/ngày', duration: '5 ngày' },
//         { drug_id: 3, dosage: '1 viên/ngày', duration: '7 ngày' },
//     ],
//     2: [{ drug_id: 2, dosage: '3 viên/ngày', duration: '7 ngày' }],
// };

// export default function Doctor() {
//     const [selectedPatient, setSelectedPatient] = useState<any>(patients[0]); // demo chọn bệnh nhân A
//     const [selectedRecord, setSelectedRecord] = useState<any>(appointmentRecords[1][0]);
//     const [selectedPrescriptions, setSelectedPrescriptions] = useState<any[]>(prescriptions[1]);

//     // Columns cho kê đơn
//     const columns = [
//         {
//             title: 'Thuốc',
//             dataIndex: 'drug_id',
//             render: (drugId: number, record: any, idx: number) => (
//                 <Select
//                     style={{ width: '100%' }}
//                     value={drugId}
//                     options={drugs.map((d) => ({ value: d.drug_id, label: d.name }))}
//                     onChange={(val) => {
//                         const newData = [...selectedPrescriptions];
//                         newData[idx].drug_id = val;
//                         setSelectedPrescriptions(newData);
//                     }}
//                 />
//             ),
//         },
//         {
//             title: 'Liều lượng',
//             dataIndex: 'dosage',
//             render: (text: string, record: any, idx: number) => (
//                 <Input
//                     value={text}
//                     onChange={(e) => {
//                         const newData = [...selectedPrescriptions];
//                         newData[idx].dosage = e.target.value;
//                         setSelectedPrescriptions(newData);
//                     }}
//                 />
//             ),
//         },
//         {
//             title: 'Thời gian',
//             dataIndex: 'duration',
//             render: (text: string, record: any, idx: number) => (
//                 <Input
//                     value={text}
//                     onChange={(e) => {
//                         const newData = [...selectedPrescriptions];
//                         newData[idx].duration = e.target.value;
//                         setSelectedPrescriptions(newData);
//                     }}
//                 />
//             ),
//         },
//     ];

//     return (
//         <div style={{ padding: 20 }}>
//             {/* SECTION 1: Thông tin bệnh nhân */}
//             <Card title="Thông tin bệnh nhân" style={{ marginBottom: 20 }}>
//                 <Descriptions bordered column={2}>
//                     <Descriptions.Item label="Họ tên">{selectedPatient.fullname}</Descriptions.Item>
//                     <Descriptions.Item label="Ngày sinh">{selectedPatient.dob}</Descriptions.Item>
//                     <Descriptions.Item label="Giới tính">
//                         {selectedPatient.gender}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Địa chỉ">{selectedPatient.address}</Descriptions.Item>
//                     <Descriptions.Item label="Mã BHYT">
//                         {selectedPatient.insurance_code}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Người liên hệ">
//                         {selectedPatient.emergency_contact}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Nghề nghiệp">{selectedPatient.job}</Descriptions.Item>
//                 </Descriptions>
//             </Card>

//             {/* SECTION 2: Chuẩn đoán + kết quả khám */}
//             <Card title="Chuẩn đoán và kết quả khám" style={{ marginBottom: 20 }}>
//                 <Descriptions bordered column={2}>
//                     <Descriptions.Item label="Triệu chứng">
//                         {selectedRecord.symptoms}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Huyết áp">
//                         {selectedRecord.blood_pressure}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Chẩn đoán ban đầu">
//                         {selectedRecord.initial_diagnosis}
//                     </Descriptions.Item>
//                     <Descriptions.Item label="Chẩn đoán cuối cùng">
//                         {selectedRecord.final_diagnosis}
//                     </Descriptions.Item>
//                 </Descriptions>

//                 <div style={{ marginTop: 16 }}>
//                     <b>Chọn ICD10:</b>
//                     <Select
//                         style={{ width: '100%', marginTop: 8 }}
//                         value={selectedRecord.icd10}
//                         options={icd10Options}
//                     />
//                 </div>
//             </Card>

//             {/* SECTION 3: Kê đơn thuốc */}
//             <Card title="Kê đơn thuốc">
//                 <Button
//                     type="dashed"
//                     onClick={() =>
//                         setSelectedPrescriptions([
//                             ...selectedPrescriptions,
//                             { drug_id: null, dosage: '', duration: '' },
//                         ])
//                     }
//                 >
//                     + Thêm thuốc
//                 </Button>
//                 <Table
//                     style={{ marginTop: 10 }}
//                     columns={columns}
//                     dataSource={selectedPrescriptions}
//                     rowKey={(_, idx) => idx.toString()}
//                     pagination={false}
//                 />
//             </Card>
//         </div>
//     );
// }
