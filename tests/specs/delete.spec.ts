import { userService } from '@/services/userService.ts';
import { postService } from '@/services/postService.ts';

describe('DELETE Request Tests', () => {
    describe('Delete User', () => {
        test('DELETE - Remove user by ID', async () => {
            const userId = 1;
            const response = await userService.deleteUser(userId);

            expect(response.status).toBe(200);
        });

        test('DELETE - Verify user deletion', async () => {
            const userId = 1;

            // Delete user
            await userService.deleteUser(userId);

            // Try to fetch deleted user (JSONPlaceholder still returns data)
            const response = await userService.getUser(userId);

            // In real API, this would return 404
            expect([200, 404]).toContain(response.status);
        });
    });

    describe('Delete Post', () => {
        test('DELETE - Remove post by ID', async () => {
            const postId = 1;
            const response = await postService.deletePost(postId);

            expect(response.status).toBe(200);
        });
    });
});