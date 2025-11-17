import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://jsonplaceholder.typicode.com';

// Debug: Log the BASE_URL to verify it's loaded
console.log('🔧 Config loaded - BASE_URL:', BASE_URL);

export const config = {
    baseURL: BASE_URL,
    timeout: parseInt(process.env.TIMEOUT || '30000'),
    logLevel: process.env.LOG_LEVEL || 'info',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};