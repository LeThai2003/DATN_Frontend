import HttpService from '@/api/httpService';

class DrugApi extends HttpService {
    getDrugByFilter = (filter: any) => {
        return this.post(filter, 'list');
    };
    craeteNewDrug = (data: any) => {
        return this.post(data, 'create');
    };
    updateDrug = (id : string, data: any) => {
        return this.put(id, data, 'update');
    };
    deleteDrug = (id : string) => {
        return this.delete(id, 'delete');
    }
}
export const drugApi = new DrugApi('drug')