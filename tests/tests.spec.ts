import request from 'supertest';
import { app } from '../src'; // Import your Express app
import User from '../src/user/user.schema';
import { dropDatabase } from '../utils/db.utils';

let adminToken: string;
describe('Register, Login and create faculty and course', () => {
  beforeAll(async () => {
    // Drop the test database collection
    const admin = {
      nic: '1251231231',
      username: 'admin',
      password: 'test123',
      role: 'ADMIN',
      name: 'John Doe',
      aId: 'ADMIN_1',
    };
    await dropDatabase();
    await User.create(admin);
  }, 10000);

  it('should login a user', async () => {
    // Login the registered user
    const loginResponse = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'test123',
    });

    // Get the token
    adminToken = loginResponse.body.access_token;
    console.log(adminToken);

    expect(loginResponse.status).toBe(200);
  }, 10000); // Increase timeout if needed

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

  it('should create a faculty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        nic: '11',
        username: 'computingFaculty',
        password: 'test123',
        role: 'FACULTY',
        name: 'Computing',
        fId: 'IT',
      })
      .set('Cookie', `jwt=${adminToken}`);

    expect(response.status).toBe(201);
  });

  it('should create a course', async () => {
    const response = await request(app)
      .post('/api/admin/courses')
      .send({
        name: 'Application Frameworks',
        courseCode: 'AF',
        credits: 3,
        faculty: 'IT',
        description: 'Course Description',
      })
      .set('Cookie', `jwt=${adminToken}`);

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    app.listen().close();
  });
});
