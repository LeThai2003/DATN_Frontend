import * as Yup from 'yup';

export const roomSchema = Yup.object().shape({
    name: Yup.string().required('Tên phòng khám là bắt buộc').max(255, 'Tên quá dài'),
    location: Yup.string().nullable().optional().max(500, 'Địa điểm quá dài'),
});
