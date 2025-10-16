import HttpService from '@/api/httpService';

class ServiceApi extends HttpService {
    getServiceByFilter = (filter: any) => {
        return this.post(filter, 'list');
    };

    updateService = (data: any, id: any) => {
        return this.put(id, data, 'update');
    };

    addService = (data: any) => {
        return this.post(data, 'create');
    };

    deleteService = (id) => {
        return this.delete(id, 'delete');
    };

    getServiceById = (id) => {
        return this.get(`get/${id}`);
    };
}

export const serviceApi = new ServiceApi('service');
