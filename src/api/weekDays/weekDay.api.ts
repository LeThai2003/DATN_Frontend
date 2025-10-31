import HttpService from '@/api/httpService';

class WeekDayApi extends HttpService {
    createWeekDays = (data) => {
        return this.post(data, 'create');
    };
}
export const weekDayApi = new WeekDayApi('weekdays');
