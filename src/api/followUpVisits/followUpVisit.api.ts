import HttpService from '@/api/httpService';

class FollowUpVisitApi extends HttpService {
    getListFollowUpVisits = (filter: any) => {
        return this.post(filter, 'list');
    };
}

export const followUpVisitApi = new FollowUpVisitApi('follow_up_visit');
