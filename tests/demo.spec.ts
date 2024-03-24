import request from 'supertest';
import { app } from '../src';
import { connectDB } from '../src/config/DBconnect';

// Mocking connectDB function
jest.mock('../src/config/DBconnect');

describe('Routes', () => {
  beforeAll(async () => {
    // Mocking the connectDB function to resolve immediately
    (connectDB as jest.MockedFunction<typeof connectDB>).mockImplementationOnce(
      async () => {
        // Mocking the database connection
        console.log('MongoDB connected');
      },
    );

    await connectDB();
  });

  it('GET / responds with "Hello World!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toMatch(/text\/html/); // Updated to match 'text/html'
    expect(response.text).toBe('Hello World!');
  });
});
