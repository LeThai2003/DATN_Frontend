import dayjs from 'dayjs';

export const formatDayDateTimeVi = (date) => {
    const str = dayjs(date).format('dddd, DD/MM/YYYY HH:mm:ss');
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDayDateVi = (date) => {
    const str = dayjs(date).format('dddd, DD/MM/YYYY');
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDateVi = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
};
