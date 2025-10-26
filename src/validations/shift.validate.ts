import dayjs from 'dayjs';
import * as Yup from 'yup';

export const shiftTimeSchema = Yup.object().shape({
    start_time: Yup.string().required('Thời gian bắt đầu là bắt buộc'),
    end_time: Yup.string()
        .required('Thời gian kết thúc là bắt buộc')
        .test(
            'is-after-start',
            'Thời gian kết thúc phải lớn hơn thời gian bắt đầu',
            function (value) {
                const { start_time } = this.parent;
                if (!start_time || !value) return true; // Bỏ qua nếu chưa nhập đủ 2 trường
                const start = dayjs(start_time, 'HH:mm');
                const end = dayjs(value, 'HH:mm');
                return end.isAfter(start);
            }
        ),
});
