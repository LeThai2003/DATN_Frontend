import { selectFilter } from '@/stores/selectors/patients/patient.selector';
import { Button, Pagination, Space, Table, TableProps, Tag } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { patient } from '@/stores/reducers';
import { initFilterPatient } from '@/defaultValues/patients/patient_default';
import FilterButton from '@/components/filters/FilterButton';
import FilterForm from '@/components/filters/FilterForm';
import { width } from '@mui/system';

const patients = [
    {
        patient_id: 1,
        fullname: 'Nguyễn Văn A',
        dob: '12-05-1995',
        gender: 'Nam',
        address: 'Hà Nội',
        insurance_code: 'BHYT123456',
        emergency_contact: '0912345678',
        phone_number: '0912345678',
        job: 'Nhân viên văn phòng',
    },
    {
        patient_id: 2,
        fullname: 'Trần Thị B',
        dob: '20-08-1998',
        gender: 'Nữ',
        address: 'Hải Phòng',
        insurance_code: 'BHYT654321',
        emergency_contact: '0987654321',
        phone_number: '0987654321',
        job: 'Giáo viên',
    },
];

// -------- giả sử đơn thuốc ---------
const samplePrescriptions = [
    {
        key: '1',
        drug_id: 1,
        drug_name: 'Paracetamol 500mg',
        unit_dosage_id: 1,
        unit_dosage_name: 'Viên',
        dosage: 10,
        dosage_time: ['Sáng', 'Tối'],
        meal_time: 'after',
        note: 'Uống với nhiều nước',
        duration: 3,
    },
    {
        key: '2',
        drug_id: 2,
        drug_name: 'Vitamin C 1000mg',
        unit_dosage_id: 1,
        unit_dosage_name: 'Viên',
        dosage: 5,
        dosage_time: ['Sáng', 'Tối'],
        meal_time: 'before',
        note: 'Uống trước bữa ăn 30 phút',
        duration: 5,
    },
];

const Patient = () => {
    const dispatch = useDispatch();

    const [isOpenPatientFilter, setIsOpenPatientFilter] = useState(false);

    const filterPatient = useSelector(selectFilter);

    const navigate = useNavigate();

    const handleOpenViewEmployee = (data) => {
        dispatch(patient.actions.setSelectPatient(data));
        navigate('/manager/patients/detail');
    };

    const columns: TableProps<any>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'patient_id',
            key: 'employee_id',
            width: 80,
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'BHYT',
            dataIndex: 'insurance_code',
            key: 'insurance_code',
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: 130,
            align: 'center',
            render: (_, record) => (
                <Button
                    color="primary"
                    variant="filled"
                    icon={<EyeOutlined />}
                    onClick={() => {
                        handleOpenViewEmployee(record);
                    }}
                    className=""
                    size="small"
                />
            ),
        },
    ];

    const FilterPatientFields = [{ key: 'search', type: 'text', placeholder: 'Tìm bệnh nhân' }];

    const handleFilterPatientChange = (key, value) => {
        dispatch(patient.actions.setFilterPatient({ ...filterPatient, [key]: value }));
        console.log(filterPatient);
    };

    const handleResetPatientFilter = () =>
        dispatch(patient.actions.setFilterPatient({ initFilterPatient }));

    const handleApplyPatientFilter = () => {
        console.log(filterPatient);
    };

    const handleChangePatientPage = (e) => {
        console.log(e);
        dispatch(
            patient.actions.setFilterPatient({
                ...filterPatient,
                pageNo: e - 1,
            })
        );
    };

    return (
        <div className="p-2 bg-white rounded-lg flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Danh sách bệnh nhân</h3>
                <div className="flex gap-2">
                    {!isOpenPatientFilter && (
                        <FilterButton onClick={() => setIsOpenPatientFilter(true)} />
                    )}
                </div>
            </div>

            {isOpenPatientFilter && (
                <FilterForm
                    fields={FilterPatientFields}
                    values={filterPatient}
                    onChange={handleFilterPatientChange}
                    onReset={handleResetPatientFilter}
                    onApply={handleApplyPatientFilter}
                    onClose={() => setIsOpenPatientFilter(false)}
                />
            )}
            <Table
                rowKey="employee_id"
                columns={columns}
                dataSource={patients}
                pagination={false}
                scroll={{ x: 'max-content', y: window.innerHeight * 0.82 - 160 }}
            />
            <div className="flex justify-end">
                <Pagination current={0} pageSize={2} onChange={(e) => {}} total={5} />
            </div>
        </div>
    );
};

export default Patient;
