import { userService } from '@/services/userService.ts';
import { postService } from '@/services/postService.ts';

describe('PATCH Request Tests', () => {
    describe('Partial Update User', () => {
        test('PATCH - Update only user name', async () => {
            const userId = 1;
            const partialUpdate = { name: 'Patched Name' };

            const response = await userService.patchUser(userId, partialUpdate);

            expect(response.status).toBe(200);
            expect(response.data.name).toBe(partialUpdate.name);
        });

        test('PATCH - Update only user email', async () => {
            const userId = 1;
            const partialUpdate = { email: 'patched@example.com' };

            const response = await userService.patchUser(userId, partialUpdate);

            expect(response.status).toBe(200);
            expect(response.data.email).toBe(partialUpdate.email);
        });
    });

    describe('Partial Update Post', () => {
        test('PATCH - Update only post title', async () => {
            const postId = 1;
            const partialUpdate = { title: 'Updated Title Only' };

            const response = await postService.patchPost(postId, partialUpdate);

            expect(response.status).toBe(200);
            expect(response.data.title).toBe(partialUpdate.title);
        });
    });
});