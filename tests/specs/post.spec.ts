import { userService } from '@/services/userService.ts';
import { postService } from '@/services/postService.ts';
import { CreateUserRequest } from '@/models/User.ts';
import { CreatePostRequest } from '@/models/Post.ts';
import { validateSchema } from '@/utils/schemaValidator.ts';
import userSchema from '../schemas/userSchema.json';
import postSchema from '../schemas/postSchema.json';

describe('POST Request Tests', () => {
    describe('Create User', () => {
        test('POST - Create new user with valid data', async () => {
            const newUser: CreateUserRequest = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                username: 'johndoe',
            };

            const response = await userService.createUser(newUser);

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('id');
            expect(response.data.name).toBe(newUser.name);
            expect(response.data.email).toBe(newUser.email);
        });

        test('POST - Create user and validate schema', async () => {
            const newUser: CreateUserRequest = {
                name: 'Jane Smith',
                email: 'jane@example.com',
            };

            const response = await userService.createUser(newUser);

            expect(response.status).toBe(201);
            expect(() => validateSchema(response.data, userSchema)).not.toThrow();
        });

        test('POST - Create user from external JSON file', async () => {
            const userData = require('../data/createUser.json');
            const response = await userService.createUser(userData);

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('id');
        });
    });

    describe('Create Post', () => {
        test('POST - Create new post', async () => {
            const newPost: CreatePostRequest = {
                userId: 1,
                title: 'Test Post',
                body: 'This is a test post body',
            };

            const response = await postService.createPost(newPost);

            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty('id');
            expect(response.data.title).toBe(newPost.title);
        });

        test('POST - Create post and validate schema', async () => {
            const postData = require('../data/createPost.json');
            const response = await postService.createPost(postData);

            expect(response.status).toBe(201);
            expect(() => validateSchema(response.data, postSchema)).not.toThrow();
        });
    });
});