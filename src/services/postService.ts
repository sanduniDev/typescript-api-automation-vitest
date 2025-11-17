import { AxiosResponse } from 'axios';
import { apiClient } from '../utils/apiClient.js';
import { Post, CreatePostRequest, UpdatePostRequest } from '../models/Post.js';

export class PostService {
    private readonly endpoint = '/posts';

    async getAllPosts(): Promise<AxiosResponse<Post[]>> {
        return apiClient.get<Post[]>(this.endpoint);
    }

    async getPost(id: number): Promise<AxiosResponse<Post>> {
        return apiClient.get<Post>(`${this.endpoint}/${id}`);
    }

    async getPostsByUser(userId: number): Promise<AxiosResponse<Post[]>> {
        return apiClient.get<Post[]>(`${this.endpoint}?userId=${userId}`);
    }

    async createPost(post: CreatePostRequest): Promise<AxiosResponse<Post>> {
        return apiClient.post<Post>(this.endpoint, post);
    }

    async updatePost(id: number, post: UpdatePostRequest): Promise<AxiosResponse<Post>> {
        return apiClient.put<Post>(`${this.endpoint}/${id}`, post);
    }

    async patchPost(id: number, post: Partial<UpdatePostRequest>): Promise<AxiosResponse<Post>> {
        return apiClient.patch<Post>(`${this.endpoint}/${id}`, post);
    }

    async deletePost(id: number): Promise<AxiosResponse<void>> {
        return apiClient.delete<void>(`${this.endpoint}/${id}`);
    }
}

export const postService = new PostService();