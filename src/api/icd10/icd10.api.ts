import HttpService from '../httpService';

class Icd10Api extends HttpService {
    getIcd10 = (filter) => this.post(filter, 'list');
}

export const icd10Api = new Icd10Api('icd10');
