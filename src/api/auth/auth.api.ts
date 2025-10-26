import HttpService from '../httpService';

class AuthApi extends HttpService {
    login = (data: { username: string; password: string }) => this.post(data, 'login');

    logout = () => this.get('logout');
}

export const authApi = new AuthApi('auth');
