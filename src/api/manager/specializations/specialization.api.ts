import HttpService from '@/api/httpService';

class SpecializationApi extends HttpService {
    getSpecializationByFilter = (filter: any) => {
        return this.post(filter, 'list');
    };

    updateSpecialization = (data: any, id: any) => {
        return this.put(id, data, 'update');
    };

    addSpecialization = (data: any) => {
        return this.post(data, 'create');
    };

    deleteSpecialization = (id) => {
        return this.delete(id, 'delete');
    };
}

export const specializationApi = new SpecializationApi('specialization');
