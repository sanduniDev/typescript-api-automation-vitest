import { userService } from '@/services/userService.ts';
import { postService } from '@/services/postService.ts';
import { CreateUserRequest } from '@/models/User.ts';
import { CreatePostRequest } from '@/models/Post.ts';

describe('API Chaining Tests', () => {
    test('Full CRUD workflow - User', async () => {
        // Step 1: CREATE - Create a new user
        const newUser: CreateUserRequest = {
            name: 'Test User',
            email: 'testuser@example.com',
            username: 'testuser',
        };

        const createResponse = await userService.createUser(newUser);
        expect(createResponse.status).toBe(201);

        const userId = createResponse.data.id!;
        expect(userId).toBeDefined();
        expect(createResponse.data.name).toBe(newUser.name);

        // NOTE: JSONPlaceholder is a fake API - it doesn't actually persist data
        // So we'll test with an existing user for READ, UPDATE, DELETE operations

        // Step 2: READ - Get an existing user
        const existingUserId = 1;
        const getResponse = await userService.getUser(existingUserId);
        expect(getResponse.status).toBe(200);
        expect(getResponse.data).toHaveProperty('name');

        // Step 3: UPDATE - Update the user (simulated)
        const updatedData = { name: 'Updated User Name' };
        const updateResponse = await userService.patchUser(existingUserId, updatedData);
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.data.name).toBe(updatedData.name);

        // Step 4: DELETE - Delete the user (simulated)
        const deleteResponse = await userService.deleteUser(existingUserId);
        expect(deleteResponse.status).toBe(200);
    });

    test('Complex workflow - Create user and their posts', async () => {
        // Create user
        const newUser: CreateUserRequest = {
            name: 'Post Author',
            email: 'author@example.com',
        };

        const userResponse = await userService.createUser(newUser);
        const userId = userResponse.data.id!;

        expect(userResponse.status).toBe(201);
        expect(userId).toBeDefined();

        // Create multiple posts for the user
        const post1: CreatePostRequest = {
            userId: userId,
            title: 'First Post',
            body: 'Content of first post',
        };

        const post2: CreatePostRequest = {
            userId: userId,
            title: 'Second Post',
            body: 'Content of second post',
        };

        const post1Response = await postService.createPost(post1);
        const post2Response = await postService.createPost(post2);

        expect(post1Response.status).toBe(201);
        expect(post2Response.status).toBe(201);

        // Verify both posts were created with correct userId
        expect(post1Response.data.userId).toBe(userId);
        expect(post2Response.data.userId).toBe(userId);
        expect(post1Response.data.title).toBe(post1.title);
        expect(post2Response.data.title).toBe(post2.title);
    });

    test('Sequential dependent API calls', async () => {
        // Get first user
        const user1 = await userService.getUser(1);
        expect(user1.status).toBe(200);
        expect(user1.data).toHaveProperty('id');

        // Use user data to get their posts
        const userPosts = await postService.getPostsByUser(user1.data.id!);
        expect(userPosts.status).toBe(200);
        expect(Array.isArray(userPosts.data)).toBe(true);

        // Get first post details if posts exist
        if (userPosts.data.length > 0) {
            const firstPost = await postService.getPost(userPosts.data[0].id!);
            expect(firstPost.status).toBe(200);
            expect(firstPost.data.userId).toBe(user1.data.id);
        }
    });

    test('Real API chaining - Create post for existing user', async () => {
        // Step 1: Get an existing user
        const userResponse = await userService.getUser(1);
        expect(userResponse.status).toBe(200);
        const userId = userResponse.data.id!;

        // Step 2: Create a post for that user (chaining the userId)
        const newPost: CreatePostRequest = {
            userId: userId,
            title: 'Chained Post',
            body: 'This post uses the userId from the previous API call',
        };

        const postResponse = await postService.createPost(newPost);
        expect(postResponse.status).toBe(201);
        expect(postResponse.data.userId).toBe(userId);

        // Step 3: Verify we can update the post (using the created post's ID)
        const postId = postResponse.data.id!;
        const updateResponse = await postService.patchPost(postId, {
            title: 'Updated Chained Post',
        });
        expect(updateResponse.status).toBe(200);
    });
});