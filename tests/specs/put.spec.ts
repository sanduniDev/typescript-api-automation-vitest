import { userService } from '@/services/userService.ts';
import { UpdateUserRequest } from '@/models/User.ts';

describe('PUT Request Tests', () => {
    test('PUT - Update entire user', async () => {
        const userId = 1;
        const updatedUser: UpdateUserRequest = {
            name: 'Updated Name',
            email: 'updated@example.com',
            username: 'updateduser',
        };

        const response = await userService.updateUser(userId, updatedUser);

        expect(response.status).toBe(200);
        expect(response.data.name).toBe(updatedUser.name);
        expect(response.data.email).toBe(updatedUser.email);
    });

    test('PUT - Verify full resource replacement', async () => {
        const userId = 1;
        const newUserData: UpdateUserRequest = {
            name: 'Completely New User',
            email: 'new@example.com',
        };

        const response = await userService.updateUser(userId, newUserData);

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', userId);
    });
});