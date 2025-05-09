import request from 'supertest';
import app from '../../app';

describe('POST /api/thermometer', () => {
  it('should create a new thermometer entry', async () => {
    const newEntry = {
      deviceId: 'DEV-5678',
      temperature: 25.5,
      humidity: 60.0,
      batteryLevel: 90.0,
      lat: 37.9838,
      long: 23.7275,
    };
    const response = await request(app).post('/api/thermometer').send(newEntry);
    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject(newEntry);
  });

  it('should return 400 for invalid data', async () => {
    const invalidEntry = { temperature: 'invalid' };
    const response = await request(app).post('/api/thermometer').send(invalidEntry);
    expect(response.status).toBe(400);
  });

  it('should return 400 for missing required fields', async () => {
    const invalidData = { temperature: 25.5 }; // Missing required fields
    const response = await request(app).post('/api/thermometer').send(invalidData);
    expect(response.status).toBe(400);
  });
});

describe('POST /api/thermometer/generate-fake-data', () => {
  it('should generate fake thermometer data', async () => {
    const response = await request(app).post('/api/thermometer/generate-fake-data').query({ count: 5 });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(5);
  });

  it('should return 400 for invalid count parameter', async () => {
    const response = await request(app).post('/api/thermometer/generate-fake-data').query({ count: -1 });
    expect(response.status).toBe(400);
  });
});