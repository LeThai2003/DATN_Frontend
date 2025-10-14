import HttpService from '@/api/httpService';

class EmployeeApi extends HttpService {
    getEmployeeByFilter = (filter: any) => {
        return this.post(filter, 'get/employees');
    };

    updateEmployee = (data: any, id: any) => {
        return this.put(id, data, 'update');
    };

    addEmployee = (data: any) => {
        return this.post(data, 'register-employee');
    };

    deleteEmployee = (id) => {
        return this.delete(id, 'delete');
    };
}

export const employeeApi = new EmployeeApi('employee');
