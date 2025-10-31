import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import dayjs from 'dayjs';

pdfMake.vfs = pdfFonts.vfs;

export const generateAppointmentRecordPDF = ({
    dataRecord,
    dataAppointment,
    dataPrescriptions,
    drugsList,
    unitsList,
    dosageTimesList,
    mealRelationsList,
    isHistory,
}) => {
    const date = dayjs(dataAppointment?.shiftId?.date);
    const day = date.format('DD');
    const month = date.format('MM');
    const year = date.year();

    const prescriptionRows = isHistory
        ? dataPrescriptions?.perscriptionCreates.map((p, i) => [
              i + 1,

              p?.drugId?.name || p?.customDrugName,

              `${p?.dosage} ${p?.unitDosageId?.name || ''} / lần`,

              p?.dosageTimeDtos?.map((time) => time?.name)?.join(', ') || '',

              p?.mealRelation?.name || '',

              p.duration?.toString() || '',

              p?.notes || p?.instructions || '',
          ])
        : dataPrescriptions?.perscriptionCreates.map((p, i) => [
              i + 1,
              drugsList?.data?.find((drug) => drug.drugId === p.drugId)?.name || p?.customDrugName,
              `${p.dosage} ${
                  unitsList?.data?.find((unit) => unit?.unitId === p?.unitDosageId)?.name || ''
              } / lần`,
              p.dosageTimeDtos?.length
                  ? dosageTimesList?.data
                        ?.filter((time) => p.dosageTimeDtos.includes(time?.timeId))
                        ?.map((time) => time?.name)
                        ?.join(', ')
                  : '',
              mealRelationsList?.data?.find((relation) => relation?.relationsId === p?.mealRelation)
                  ?.name || '',
              p.duration?.toString() || '',
              p?.notes || p?.instructions || '',
          ]);

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
                            dataAppointment?.phoneNumber || dataAppointment?.patientId?.phoneNumber,
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
                            dataRecord?.height || '',
                            'Cân nặng (kg):',
                            dataRecord?.weight || '',
                        ],
                        [
                            'Huyết áp (mmHg):',
                            dataRecord?.bloodPressure || '',
                            'Nhiệt độ (°C):',
                            dataRecord?.temperature || '',
                        ],
                        [
                            'Nhịp tim (lần/phút):',
                            dataRecord?.heartRate || '',
                            'SpO₂ (%):',
                            dataRecord?.spo2 || '',
                        ],
                    ],
                },
                layout: 'lightHorizontalLines',
            },
            { text: `Triệu chứng: ${dataRecord?.symptoms || ''}`, margin: [0, 8, 0, 0] },

            // CHẨN ĐOÁN
            { text: 'III. CHẨN ĐOÁN VÀ KẾ HOẠCH ĐIỀU TRỊ', style: 'sectionHeader' },
            {
                table: {
                    widths: ['auto', '*'],
                    body: [
                        ['Chẩn đoán ban đầu:', dataRecord?.initialDiagnosis || ''],
                        ['Chẩn đoán cuối cùng:', dataRecord?.finalDiagnosis || ''],
                        ['Mã ICD-10:', dataRecord?.icd10?.code || dataRecord?.icd10 || ''],
                        ['Kế hoạch điều trị:', dataRecord?.notes || ''],
                        // ['Ghi chú thêm:', dataRecord?.notes],
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
                            'Thời điểm uống',
                            'So với bữa ăn',
                            'Số ngày uống',
                            'Ghi chú',
                        ],
                        ...prescriptionRows,
                    ],
                },
                layout: 'lightHorizontalLines',
            },

            // TÁI KHÁM
            { text: 'V. HẸN TÁI KHÁM', style: 'sectionHeader' },
            {
                text: `Ngày tái khám: ${
                    dataRecord?.followUpVisit?.followUpDate
                        ? dayjs(dataRecord?.followUpVisit?.followUpDate)?.format('DD/MM/YYYY')
                        : 'Không'
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
