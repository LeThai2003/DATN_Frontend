import HttpService from '@/api/httpService';


class DosageTimeApi extends HttpService {
    createNewDosageTime = (data: any) => {
        return this.post(data, 'create');
    }
    updateDosageTime = (id : string, data: any) => {
        return this.put(id, data, 'update');
    }
    deleteDosageTime = (id : string) => {
        return this.delete(id, 'delete');
    }
    getDosageTimeByFilter = (filter: any) => {
        return this.post(filter, 'list');
    }
}

export const dosageTimeApi = new DosageTimeApi('dosage_time')
