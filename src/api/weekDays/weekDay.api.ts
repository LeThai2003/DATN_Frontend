import HttpService from '@/api/httpService';

class WeekDayApi extends HttpService {
    createWeekDays = (data) => {
        return this.post(data, 'create');
    };

    getWeekDaysEmployee = (filter) => {
        return this.post(filter, 'filter');
    };

    getWeekDayEmployeeDetail = (group) => {
        return this.get(`group/${group}`);
    };
}
export const weekDayApi = new WeekDayApi('weekdays');
