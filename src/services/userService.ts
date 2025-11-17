import { AxiosResponse } from 'axios';
import { apiClient } from '../utils/apiClient.js';
import { User, CreateUserRequest, UpdateUserRequest } from '../models/User.js';

export class UserService {
    private readonly endpoint = '/users';

    async getAllUsers(): Promise<AxiosResponse<User[]>> {
        return apiClient.get<User[]>(this.endpoint);
    }

    async getUser(id: number): Promise<AxiosResponse<User>> {
        return apiClient.get<User>(`${this.endpoint}/${id}`);
    }

    async createUser(user: CreateUserRequest): Promise<AxiosResponse<User>> {
        return apiClient.post<User>(this.endpoint, user);
    }

    async updateUser(id: number, user: UpdateUserRequest): Promise<AxiosResponse<User>> {
        return apiClient.put<User>(`${this.endpoint}/${id}`, user);
    }

    async patchUser(id: number, user: Partial<UpdateUserRequest>): Promise<AxiosResponse<User>> {
        return apiClient.patch<User>(`${this.endpoint}/${id}`, user);
    }

    async deleteUser(id: number): Promise<AxiosResponse<void>> {
        return apiClient.delete<void>(`${this.endpoint}/${id}`);
    }
}

export const userService = new UserService();