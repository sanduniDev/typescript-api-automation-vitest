import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config/config.js';
import { logger } from './logger.js';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout,
            headers: config.headers,
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                logger.info(`Request: ${config.method?.toUpperCase()} ${config.url}`);
                if (config.data) {
                    logger.debug('Request Body:', config.data);
                }
                return config;
            },
            (error) => {
                logger.error('Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => {
                logger.info(`Response: ${response.status} ${response.statusText}`);
                logger.debug('Response Data:', response.data);
                return response;
            },
            (error) => {
                if (error.response) {
                    logger.error(`Response Error: ${error.response.status}`, error.response.data);
                } else {
                    logger.error('Network Error:', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.patch<T>(url, data, config);
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }
}

export const apiClient = new ApiClient();