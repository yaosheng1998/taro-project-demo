import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@utils/globaling/token';
import { BASE_URL_COLLECTOR } from '@config/index';
import { checkStatus } from './helper/checkStatus';
import { AxiosCanceler } from './helper/axiosCancel';
import to from 'await-to-js';

interface Result<T> {
    rc: number;
    result: T;
}

const axiosCanceler = new AxiosCanceler();

const config = {
    baseURL: BASE_URL_COLLECTOR,
    timeout: 60000
};

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);

        this.service.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                axiosCanceler.addPending(config);
                // config.headers!.Authorization = getToken();
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data, config } = response;
                axiosCanceler.removePending(config);
                return data;
            },
            async (error: AxiosError) => {
                const { response } = error;
                if (response) checkStatus(response.status);
                return Promise.reject(error);
            }
        );
    }

    // * 常用请求方法封装
    get<T = any[]>(url: string, params?: object, _object = {}): Promise<Result<T>> {
        return this.service.get(url, { params, ..._object });
    }
    post<T = any[]>(url: string, params?: object, _object = {}): Promise<Result<T>> {
        return this.service.post(url, params, _object);
    }
    put<T = any[]>(url: string, params?: object, _object = {}): Promise<Result<T>> {
        return this.service.put(url, params, _object);
    }
    delete<T = any[]>(url: string, params?: any, _object = {}): Promise<Result<T>> {
        return this.service.delete(url, { params, ..._object });
    }
}

export default new RequestHttp(config as any);
