import { ModalState, ModalType } from '@/types/stores/common';
import React, { useEffect } from 'react';
import ModalBase from '../ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@/stores/reducers';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { NewAppointmentRecord } from '@/types/stores/appointmentRecords/appointmentRecord_type';
import { Appointment } from '@/types/stores/appointments/appointment_type';
import dayjs from 'dayjs';
import { selectDrugs } from '@/stores/selectors/drugs/drug.selector';
import { selectMealRealtions } from '@/stores/selectors/mealRelations/mealRelation.selector';
import { selectUnits } from '@/stores/selectors/units/unit.selector';
import { selectDosageTimes } from '@/stores/selectors/dosageTimes/dosageTime.selector';
import { getInfo } from '@/stores/actions/managers/employees/employee.action';
import { selectEmployeeInfo } from '@/stores/selectors/employees/employee.selector';
import { createAppointmentRecord } from '@/stores/actions/appointmentRecord.s/appointmentRecord.action';

pdfMake.vfs = pdfFonts.vfs;

const ModalConfirmSaveRecord: React.FC<ModalState> = ({ data, type, variant }) => {
    const drugsList = useSelector(selectDrugs);
    const mealRelationsList = useSelector(selectMealRealtions);
    const unitsList = useSelector(selectUnits);
    const dosageTimesList = useSelector(selectDosageTimes);

    const infoEmployee = useSelector(selectEmployeeInfo);

    const user = JSON.parse(localStorage.getItem('user') || null);

    useEffect(() => {
        if (user && user?.authorities[0]?.authority == 'ROLE_DOCTOR') {
            dispatch(getInfo({ username: user?.username }));
        }
    }, [user?.username]);

    const { dataRecord, dataAppointment, dataPrescriptions } = (data || {}) as {
        dataRecord: NewAppointmentRecord;
        dataAppointment: Appointment;
        dataPrescriptions: any;
    };

    const date = dayjs(dataAppointment?.shiftId?.date);
    const day = date.get('date').toString().padStart(2, '0');
    const month = (date.get('month') + 1).toString().padStart(2, '0');
    const year = date.get('year');

    // console.log(dataPrescriptions);

    const dispatch = useDispatch();

    const handleGeneratePDF = () => {
        const docDefinition: any = {
            content: [
                // HEADER
                { text: 'PHIẾU KẾT QUẢ KHÁM BỆNH', style: 'header' },
                {
                    text: `Dịch vụ khám: ${dataAppointment?.serviceId?.name}`,
                    alignment: 'center',
                    margin: [0, 0, 0, 5],
                },
                {
                    text: `Phòng khám: ${dataAppointment?.roomDto?.name} - ${dataAppointment?.roomDto?.location}`,
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                },

                // THÔNG TIN BỆNH NHÂN
                { text: 'I. THÔNG TIN BỆNH NHÂN', style: 'sectionHeader' },
                {
                    table: {
                        widths: ['auto', '*', 'auto', '*'],
                        body: [
                            [
                                'Họ tên:',
                                dataAppointment?.fullname || dataAppointment?.patientId?.fullName,
                                'Giới tính:',
                                dataAppointment?.gender || dataAppointment?.patientId?.gender
                                    ? 'Nam'
                                    : 'Nữ',
                            ],
                            [
                                'Ngày sinh:',
                                dayjs(dataAppointment?.dob).format('DD/MM/YYYY') ||
                                    dayjs(dataAppointment?.patientId?.dob).format('DD/MM/YYYY'),
                                'SĐT:',
                                dataAppointment?.phoneNumber ||
                                    dataAppointment?.patientId?.phoneNumber,
                            ],
                            [
                                'Địa chỉ:',
                                dataAppointment?.address || dataAppointment?.patientId?.address,
                                'Mã BHYT:',
                                dataAppointment?.insuranceCode ||
                                    dataAppointment?.patientId?.insuranceCode,
                            ],
                        ],
                    },
                    layout: 'lightHorizontalLines',
                },

                // THÔNG TIN KHÁM
                { text: 'II. KẾT QUẢ KHÁM LÂM SÀNG', style: 'sectionHeader' },
                {
                    table: {
                        widths: ['auto', '*', 'auto', '*'],
                        body: [
                            [
                                'Chiều cao (cm):',
                                dataRecord?.height,
                                'Cân nặng (kg):',
                                dataRecord?.weight,
                            ],
                            [
                                'Huyết áp (mmHg):',
                                dataRecord?.bloodPressure,
                                'Nhiệt độ (°C):',
                                dataRecord?.temperature,
                            ],
                            [
                                'Nhịp tim (lần/phút):',
                                dataRecord?.heartRate,
                                'SpO₂ (%):',
                                dataRecord?.spo2,
                            ],
                        ],
                    },
                    layout: 'lightHorizontalLines',
                },
                { text: `Triệu chứng: ${dataRecord?.symptoms}`, margin: [0, 8, 0, 0] },

                // CHẨN ĐOÁN
                { text: 'III. CHẨN ĐOÁN VÀ KẾ HOẠCH ĐIỀU TRỊ', style: 'sectionHeader' },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Chẩn đoán ban đầu:', dataRecord?.initialDiagnosis],
                            ['Chẩn đoán cuối cùng:', dataRecord?.finalDiagnosis],
                            ['Mã ICD-10:', dataRecord?.icd10],
                            ['Kế hoạch điều trị:', dataRecord?.notes],
                        ],
                    },
                    layout: 'lightHorizontalLines',
                },

                // ĐƠN THUỐC
                {
                    text: 'IV. ĐƠN THUỐC',
                    style: 'sectionHeader',
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', '*', '*', '*', '*', '*'],
                        body: [
                            [
                                'STT',
                                'Tên thuốc',
                                'Liều dùng',
                                'Số ngày',
                                'Thời điểm uống',
                                'So với bữa ăn',
                                'Ghi chú',
                            ],
                            // dùng spread để bung mảng các dòng thuốc
                            ...dataPrescriptions?.perscriptionCreates.map((p, i) => [
                                i + 1,
                                drugsList?.data?.find((drug) => drug.drugId === p.drugId)?.name ||
                                    p?.customDrugName,
                                // liều + đơn vị
                                `${p.dosage} ${
                                    unitsList?.data?.find(
                                        (unit) => unit?.unitId === p?.unitDosageId
                                    )?.name || ''
                                }`,
                                // thời gian (ngày)
                                p.duration?.toString() || '',
                                // thời điểm uống (ví dụ: sáng, trưa)
                                p.dosageTimeDtos?.length
                                    ? dosageTimesList?.data
                                          ?.filter((time) =>
                                              p.dosageTimeDtos.includes(time?.timeId)
                                          )
                                          ?.map((time) => time?.name)
                                          ?.join(', ')
                                    : '',
                                // trước/sau ăn
                                mealRelationsList?.data?.find(
                                    (relation) => relation?.relationsId === p?.mealRelation
                                )?.name || '',
                                // ghi chú
                                p.notes || p.instructions || '',
                            ]),
                        ],
                    },
                    layout: 'lightHorizontalLines',
                },

                // TÁI KHÁM
                { text: 'V. HẸN TÁI KHÁM', style: 'sectionHeader' },
                {
                    text: `Ngày tái khám: ${
                        dayjs(dataRecord?.followUpVisit?.followUpDate)?.format('DD/MM/YYYY') ||
                        'Không'
                    }`,
                    margin: [0, 4, 0, 0],
                },
                {
                    text: `Ghi chú: ${dataRecord?.followUpVisit?.notes || ''}`,
                    margin: [0, 2, 0, 10],
                },

                // FOOTER
                {
                    margin: [0, 30, 0, 0],
                    alignment: 'right',
                    stack: [
                        {
                            text: `Tp. Hồ Chí Minh, ngày ${day} tháng ${month} năm ${year}`,
                            italics: true,
                            margin: [0, 0, 0, 10],
                        },
                        {
                            text: `Bác sĩ khám: ${
                                dataAppointment?.shiftId?.employeeDto?.fullName || ''
                            }\n(Ký và ghi rõ họ tên)`,
                            alignment: 'right',
                        },
                    ],
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 0, 0, 10],
                },
                sectionHeader: {
                    fontSize: 14,
                    bold: true,
                    color: '#0070c0',
                    margin: [0, 10, 0, 5],
                },
            },
            defaultStyle: {
                fontSize: 11,
            },
        };
        pdfMake
            .createPdf(docDefinition)
            .download(
                `PhieuKham_${dataAppointment?.fullname || dataAppointment?.patientId?.fullName}_${
                    dataAppointment?.serviceId?.name
                }_${dayjs(dataAppointment?.shiftId?.date).format('DDMMYYYY')}.pdf`
            );
    };

    const handleConfirm = () => {
        handleGeneratePDF();
        const data = dataRecord;

        dispatch(
            createAppointmentRecord({
                data,
                employeeId: infoEmployee.employeeId,
            })
        );
    };

    const handleCancel = () => {
        dispatch(common.actions.setHiddenModal(ModalType.CONFIRM_SAVE_RECORD));
    };

    return (
        <ModalBase type={type} size="sm">
            <h2 className="text-lg font-semibold text-center">Xác nhận lưu</h2>
            <p className="text-sm italic mb-2 text-center">
                <strong>Chú ý:</strong> Khi lưu sẽ không thể quay lại.
            </p>
            <div className="flex justify-center gap-3">
                <button
                    onClick={handleCancel}
                    className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400"
                >
                    Hủy
                </button>
                <button
                    onClick={handleConfirm}
                    className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    Lưu
                </button>
            </div>
        </ModalBase>
    );
};

export default ModalConfirmSaveRecord;
