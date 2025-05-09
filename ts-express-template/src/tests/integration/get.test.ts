import request from 'supertest';
import app from '../../app';

describe('GET /api/thermometer', () => {
  it('should return all thermometer data', async () => {
    const response = await request(app).get('/api/thermometer');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});


describe('GET /api/thermometer/:id', () => {
  it('should return a specific thermometer entry', async () => {
    const id = "681de60d6ebcd8b77954b531"; // Replace with a valid ID from your database
    const response = await request(app).get(`/api/thermometer/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', id);
  });

  it('should return 404 for a non-existent entry', async () => {
    const invalidId = "6810e38da1afcd87eb6f1b0a";
    const response = await request(app).get(`/api/thermometer/${invalidId}`);
    expect(response.status).toBe(404);
  });
});


describe('GET /api/thermometer/device/:deviceId', () => {
  it('should return thermometer data for a specific device ID', async () => {
    const deviceId = 'device-1'; // Replace with a valid device ID
    const response = await request(app).get(`/api/thermometer/device/${deviceId}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should return 404 if no data exists for the device ID', async () => {
    const invalidDeviceId = 'INVALID-DEVICE-ID';
    const response = await request(app).get(`/api/thermometer/device/${invalidDeviceId}`);
    expect(response.status).toBe(404);
  });
});

describe('GET /api/thermometer/device/:deviceId/latest', () => {
  it('should return the latest thermometer data for a specific device ID', async () => {
    const deviceId = 'device-2'; // Replace with a valid device ID
    const response = await request(app).get(`/api/thermometer/device/${deviceId}/latest`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('deviceId', deviceId);
  });

  it('should return 404 if no data exists for the device ID', async () => {
    const invalidDeviceId = 'INVALID-DEVICE-ID';
    const response = await request(app).get(`/api/thermometer/device/${invalidDeviceId}/latest`);
    expect(response.status).toBe(404);
  });
});

describe('GET /api/thermometer/device/:deviceId/time-range', () => {
  it('should return thermometer data for a specific device ID within a time range', async () => {
    const deviceId = 'device-1'; // Replace with a valid device ID
    const startTime = new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString();
    const endTime = new Date().toISOString(); // Now
    const response = await request(app)
      .get(`/api/thermometer/device/${deviceId}/time-range`)
      .query({ startTime, endTime });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should return 400 for invalid time range parameters', async () => {
    const deviceId = 'DEV-1234'; // Replace with a valid device ID
    const response = await request(app)
      .get(`/api/thermometer/device/${deviceId}/time-range`)
      .query({ startTime: 'invalid', endTime: 'invalid' });
    expect(response.status).toBe(400);
  });

  it('should return 404 if no data exists for the specified time range', async () => {
    const deviceId = 'DEV-1234'; // Replace with a valid device ID
    const startTime = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(); // 24 hours ago
    const endTime = new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(); // 23 hours ago
    const response = await request(app)
      .get(`/api/thermometer/device/${deviceId}/time-range`)
      .query({ startTime, endTime });
    expect(response.status).toBe(404);
  });
});