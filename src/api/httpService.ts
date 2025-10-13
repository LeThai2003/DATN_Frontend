// src/services/HttpService.ts
import { deleteAllCookies, getCookies, setCookies } from '@/utils/cookies/cookies';
import axios, { AxiosInstance } from 'axios';
import type { ResponseType as AxiosResponseType } from 'axios';

const navigateToPage = (path: string) => {
    // Sử dụng history API để chuyển trang mà không reload
    window.history.pushState({}, '', path);
    // Trigger navigation event để React Router cập nhật
    window.dispatchEvent(new PopStateEvent('popstate'));
};

// Hàm helper để xử lý error navigation
const handleErrorNavigation = (status: number, currentPath: string) => {
    const errorPages = {
        404: '/404',
        500: '/500',
        503: '/500',
    };

    const targetPath = errorPages[status];
    if (targetPath && currentPath !== targetPath) {
        navigateToPage(targetPath);
        return true; // Đã navigate
    }
    return false; // Không navigate
};

class HttpService {
    protected entity: string;
    protected instance: AxiosInstance;
    protected token: string;

    constructor(entity: string) {
        this.entity = entity;
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
        });
        this.instance.interceptors.response.use((response) => response, this.handleError);
        this.token = getCookies('access_token');
    }

    private async handleError(error: any) {
        console.log(error);
        let formatError = {};
        if (!error?.response) {
            // Xử lý network error
            if (!handleErrorNavigation(500, window.location.pathname)) {
                formatError = { message: 'Network error or server unavailable', status: 500 };
                return Promise.reject(formatError);
            }
            return;
        }
        if (error?.response) {
            const { data, status } = error.response;
            const isServer = typeof window === 'undefined';
            switch (status) {
                case 401:
                    if (!isServer) {
                        const refresh_token = getCookies('refresh_token');
                        const access_token = getCookies('access_token');

                        if (
                            refresh_token == null ||
                            refresh_token == undefined ||
                            access_token == null ||
                            access_token == undefined
                        ) {
                            return;
                        }
                        try {
                            const response = await axios.post(
                                `${
                                    import.meta.env.VITE_BACKEND_URL
                                }/auth/refreshToken/${access_token}/${refresh_token}`
                            );
                            const accessToken = response.data.access_token;
                            const refreshToken = response.data.refresh_token;

                            setCookies('refresh_token', refreshToken, 30);
                            setCookies('access_token', accessToken, 7);
                            const newRequest = {
                                ...error.config,
                                headers: {
                                    ...error.config.headers,
                                    Authorization: 'Bearer ' + accessToken,
                                },
                            };
                            if (newRequest.url.includes('import')) {
                                newRequest.headers['Content-Type'] = 'multipart/form-data';
                            }
                            return await axios(newRequest);
                        } catch (error) {
                            if (error.response.status >= 400 && error.response.status <= 600) {
                                // BAD request
                                formatError = {
                                    status: error.response.status,
                                    message: error.response.data.message,
                                };
                                return Promise.reject(formatError);
                            } else {
                                deleteAllCookies();
                                window.location.href = 'login';
                                return;
                            }
                        }
                    }
                    break;
                case 500:
                    if (!handleErrorNavigation(500, window.location.pathname)) {
                        formatError = { message: 'Internal server error', status: 500 };
                    }
                    break;
                case 503:
                    if (!isServer) deleteAllCookies();
                    if (!handleErrorNavigation(503, window.location.pathname)) {
                        formatError = { message: 'Service unavailable', status: 503 };
                    }
                    break;
                default:
                    break;
            }
            const { message, ...restData } = data;
            formatError = { message, status, ...restData };
        }

        // Aborted request case
        if (error?.code === 'ECONNABORTED') {
            formatError = { message: 'Request aborted', status: 'canceled' };
        }
        // For dev only
        return Promise.reject(formatError);
    }

    get = <T = any>(
        endpoint: string,
        params: Record<string, any> = {},
        responseType: AxiosResponseType = 'json'
    ) => {
        return this.instance.get<T>(`/${this.entity}/${endpoint}`, {
            params,
            responseType,
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : undefined,
                'Content-Type': 'application/json',
            },
        });
    };

    getOne = <T = any>(id: number) => this.instance.get<T>(`/${this.entity}/${id}`);

    getList = <T = any>(params?: Record<string, any>) =>
        this.instance.get<T>(`/${this.entity}`, { params });

    post = <T = any>(data: any, endpoint = '') =>
        this.instance.post<T>(`/${this.entity}/${endpoint}`, data, {
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : undefined,
                'Content-Type': 'application/json',
            },
        });

    put = <T = any>(id: string | number, data: any, path: string) =>
        this.instance.put<T>(`/${this.entity}/${path}/${id}`, data, {
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : undefined,
                'Content-Type': 'application/json',
            },
        });

    patch = <T = any>(id: string | number, data: any) =>
        this.instance.patch<T>(`/${this.entity}/${id}`, data);

    delete = <T = any>(id: string | number, endpoint?: string) =>
        this.instance.delete<T>(`/${this.entity}/${endpoint}/${id}`, {
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : undefined,
                'Content-Type': 'application/json',
            },
        });

    upload = <T = any>(data: FormData, endpoint = 'upload') =>
        this.instance.post<T>(`/${this.entity}/${endpoint}`, data, {
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : undefined,
                'Content-Type': 'multipart/form-data',
            },
        });
}

export default HttpService;
