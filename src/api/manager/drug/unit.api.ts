import HttpService from "@/api/httpService";

class UnitApi extends HttpService {
    getUnitList = (filter: any) => {
        return this.post(filter, 'list')
    };
    updateUnit = (id : string, data : any) => {
        return this.put(id, data, 'update')
    };
    createUnit = (data : any) => {
        return this.post(data, 'create')
    };
    deleteUnit = (id : string) => {
        return this.delete(id, 'delete')
    }
}

export const unitApi = new UnitApi("unit");