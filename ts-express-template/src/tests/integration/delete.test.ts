import request from 'supertest';
import app from '../../app';

describe('DELETE /api/thermometer/:id', () => {
  it('should delete a specific thermometer entry', async () => {
    const id = "681de82bf33a7e7c7b589643"; // Replace with a valid ID from your database
    const response = await request(app).delete(`/api/thermometer/${id}`);
    expect(response.status).toBe(200);
  });

  it('should return 404 if the ID does not exist', async () => {
    const invalidId = '6810e38da1afcd87eb6f1b0a'; // Non-existent ID
    const response = await request(app).delete(`/api/thermometer/${invalidId}`);
    expect(response.status).toBe(404);
  });

  it('should return 404 for a non-existent entry', async () => {
    const invalidId = "6810e41et1bfcd87eb6f1b0b";
    const response = await request(app).delete(`/api/thermometer/${invalidId}`);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/thermometer/device/:deviceId', () => {
  it('should delete thermometer data for a specific device ID', async () => {
    const deviceId = 'device-123'; // Replace with a valid device ID from your database
    const response = await request(app).delete(`/api/thermometer/device/${deviceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.message).toContain(deviceId);
  });

  it('should return 404 if the device ID does not exist', async () => {
    const invalidDeviceId = 'invalid-device-id'; // Non-existent device ID
    const response = await request(app).delete(`/api/thermometer/device/${invalidDeviceId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error.message).toContain(invalidDeviceId);
  });

  it('should return 400 for invalid device ID format', async () => {
    const invalidDeviceId = ''; // Invalid device ID format
    const response = await request(app).delete(`/api/thermometer/device/${invalidDeviceId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error.message).toContain('Invalid');
  });
});