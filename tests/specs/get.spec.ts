import { describe, test, expect } from 'vitest';
import { userService } from '../../src/services/userService.js';
import { postService } from '../../src/services/postService.js';

describe('GET Request Tests', () => {
    describe('Users API', () => {
        test('GET - Fetch all users', async () => {
            const response = await userService.getAllUsers();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data.length).toBeGreaterThan(0);
        });

        test('GET - Fetch single user by ID', async () => {
            const userId = 1;
            const response = await userService.getUser(userId);

            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty('id', userId);
            expect(response.data).toHaveProperty('name');
            expect(response.data).toHaveProperty('email');
        });

        test('GET - Verify user object structure', async () => {
            const response = await userService.getUser(1);

            expect(response.data).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
            });
        });

        test('GET - Non-existent user returns 404', async () => {
            // JSONPlaceholder returns 404 for non-existent resources
            try {
                await userService.getUser(99999);
                // If we reach here, the request succeeded when it should have failed
                expect.fail('Expected request to fail with 404');
            } catch (error: any) {
                // Axios throws an error for 4xx/5xx responses
                expect(error.response?.status).toBe(404);
            }
        });
    });

    describe('Posts API', () => {
        test('GET - Fetch all posts', async () => {
            const response = await postService.getAllPosts();

            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data.length).toBeGreaterThan(0);
        });

        test('GET - Fetch posts by userId', async () => {
            const userId = 1;
            const response = await postService.getPostsByUser(userId);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.data)).toBe(true);
            response.data.forEach((post) => {
                expect(post.userId).toBe(userId);
            });
        });
    });
});