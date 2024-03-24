import request from 'supertest';
import { app } from '../src'; // Import your Express app
import User from '../src/user/user.schema';
import { dropDatabase } from '../utils/db.utils';

let adminToken: string;
describe('Login Route', () => {
  beforeAll(async () => {
    // Drop the test database collection
    await dropDatabase();
  });

  it('should login a user', async () => {
    // Register a new user first
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        nic: '1251231231',
        username: 'admin',
        password: 'test123',
        role: 'ADMIN',
        name: 'John Doe',
        aId: 'ADMIN_1',
      });

    expect(registerResponse.status).toBe(201);

    // Login the registered user
    const loginResponse = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'test123',
    });

    // Get the token
    adminToken = loginResponse.body.access_token;
    console.log(adminToken);

    expect(loginResponse.status).toBe(200);
  }, 100000); // Increase timeout if needed

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 500 for internal server error', async () => {
    // Mock the findOne method to throw an error
    jest
      .spyOn(User, 'findOne')
      .mockRejectedValueOnce(new Error('Internal Server Error'));

    const response = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'test123',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
