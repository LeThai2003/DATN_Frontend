import { deleteAllCookies, getCookies, setCookies } from '@/utils/cookies/cookies';
import axios, { AxiosInstance } from 'axios';
import type { ResponseType as AxiosResponseType } from 'axios';

const navigateToPage = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
};

const handleErrorNavigation = (status: number, currentPath: string) => {
    const errorPages: Record<number, string> = {
        404: '/404',
        500: '/500',
        503: '/500',
    };
    const targetPath = errorPages[status];
    if (targetPath && currentPath !== targetPath) {
        navigateToPage(targetPath);
        return true;
    }
    return false;
};

class HttpService {
    protected entity: string;
    protected instance: AxiosInstance;

    constructor(entity: string) {
        this.entity = entity;

        this.instance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
        });

        this.instance.interceptors.request.use((config) => {
            const token = getCookies('access_token') || localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.instance.interceptors.response.use(
            (response) => response,
            (error) => Promise.reject(error)
        );
    }

    // Bọc request để luôn trả { data, error }
    protected async safeRequest<T>(
        promise: Promise<any>
    ): Promise<{ data: T | null; error: any | null }> {
        try {
            const response = await promise;
            return { data: response.data as T, error: null };
        } catch (error: any) {
            const handled = await this.handleError(error);
            return handled as { data: T | null; error: any | null };
        }
    }

    /** Xử lý lỗi thống nhất */
    private async handleError(error: any): Promise<{ data: null; error: any }> {
        console.log('HTTP Error:', error);
        let formatError: any = {};

        if (!error?.response) {
            if (!handleErrorNavigation(500, window.location.pathname)) {
                formatError = { message: 'Network error or server unavailable', status: 500 };
            }
            return { data: null, error: { message: error?.message, status: 500 } };
        }

        const { data, status } = error.response;
        const isServer = typeof window === 'undefined';

        switch (status) {
            case 401: {
                if (!isServer) {
                    const refresh_token =
                        getCookies('refresh_token') || localStorage.getItem('refresh_token');
                    const access_token =
                        getCookies('access_token') || localStorage.getItem('access_token');

                    if (!refresh_token || !access_token) {
                        deleteAllCookies();
                        if (window.location.pathname !== '/auths/login') {
                            navigateToPage('/auths/login');
                        }
                        return {
                            data: null,
                            error: { message: data?.message || 'Unauthorized', status },
                        };
                    }

                    try {
                        // Refresh token
                        const response = await axios.post(
                            `${
                                import.meta.env.VITE_BACKEND_URL
                            }/auth/refresh?refreshToken=${refresh_token}`
                        );

                        const accessToken = response.data.access_token;
                        const refreshToken = response.data.refresh_token;

                        // Lưu token mới
                        setCookies('access_token', accessToken, 7);
                        setCookies('refresh_token', refreshToken, 30);

                        // Thử lại request ban đầu với token mới
                        const newRequest = {
                            ...error.config,
                            headers: {
                                ...error.config.headers,
                                Authorization: `Bearer ${accessToken}`,
                            },
                        };
                        if (newRequest.url.includes('import')) {
                            newRequest.headers['Content-Type'] = 'multipart/form-data';
                        }

                        const retryResponse = await axios(newRequest);
                        return { data: retryResponse.data, error: null };
                    } catch {
                        deleteAllCookies();
                        if (window.location.pathname !== '/auths/login') {
                            navigateToPage('/auths/login');
                        }
                        return {
                            data: null,
                            error: { message: data?.message || 'Unauthorized', status },
                        };
                    }
                }
                break;
            }

            case 500:
                if (!handleErrorNavigation(500, window.location.pathname)) {
                    formatError = {
                        message: data?.message || 'Internal server error',
                        status: 500,
                    };
                }
                break;

            case 503:
                if (!isServer) deleteAllCookies();
                if (!handleErrorNavigation(503, window.location.pathname)) {
                    formatError = { message: data?.message || 'Service unavailable', status: 503 };
                }
                break;

            default:
                formatError = { message: data?.message || 'Unexpected error', status };
                break;
        }

        if (error?.code === 'ECONNABORTED') {
            formatError = { message: 'Request aborted', status: 'canceled' };
        }

        return { data: null, error: formatError };
    }

    // ==============================
    get = <T = any>(
        endpoint: string,
        params: Record<string, any> = {},
        responseType: AxiosResponseType = 'json'
    ) =>
        this.safeRequest<T>(
            this.instance.get(`/${this.entity}/${endpoint}`, { params, responseType })
        );

    getOne = <T = any>(id: number) =>
        this.safeRequest<T>(this.instance.get(`/${this.entity}/${id}`));

    getList = <T = any>(params?: Record<string, any>) =>
        this.safeRequest<T>(this.instance.get(`/${this.entity}`, { params }));

    post = <T = any>(data: any, endpoint = '') =>
        this.safeRequest<T>(this.instance.post(`/${this.entity}/${endpoint}`, data));

    put = <T = any>(id: string | number, data: any, path: string) =>
        this.safeRequest<T>(this.instance.put(`/${this.entity}/${path}/${id}`, data));

    patch = <T = any>(id: string | number, data: any) =>
        this.safeRequest<T>(this.instance.patch(`/${this.entity}/${id}`, data));

    delete = <T = any>(id: string | number, endpoint?: string) =>
        this.safeRequest<T>(this.instance.delete(`/${this.entity}/${endpoint}/${id}`));

    upload = <T = any>(data: FormData, endpoint = 'upload') =>
        this.safeRequest<T>(
            this.instance.post(`/${this.entity}/${endpoint}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        );
}

export default HttpService;
