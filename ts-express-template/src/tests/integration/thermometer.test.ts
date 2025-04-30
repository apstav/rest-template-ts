import request from 'supertest';
import app from '../../app';

describe('Thermometer API Integration Tests', () => {
  describe('GET /api/thermometer', () => {
    it('should fetch all thermometer data', async () => {
      const response = await request(app).get('/api/thermometer');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('POST /api/thermometer', () => {
    it('should create a thermometer entry', async () => {
      const newEntry = {
        deviceId: 'DEV-9999',
        temperature: 28.5,
        humidity: 55.0,
        batteryLevel: 75.0,
        lat: 37.9755,
        long: 23.7348,
      };
      const response = await request(app).post('/api/thermometer').send(newEntry);
      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject(newEntry);
    });
  });

  describe('GET /api/thermometer/:id', () => {
    it('should fetch thermometer data by ID', async () => {
      const id = '68121000732466059eba4961'; // Replace with a valid ID
      const response = await request(app).get(`/api/thermometer/${id}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('id', id);
    });
  });

  describe('PUT /api/thermometer/:id', () => {
    it('should update thermometer data', async () => {
      const id = '68121000732466059eba4961'; // Replace with a valid ID
      const updatedData = { temperature: 32.0 };
      const response = await request(app).put(`/api/thermometer/${id}`).send(updatedData);
      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject(updatedData);
    });
  });

  describe('DELETE /api/thermometer/:id', () => {
    it('should delete thermometer data', async () => {
      const id = '68121000732466059eba4961'; // Replace with a valid ID
      const response = await request(app).delete(`/api/thermometer/${id}`);
      expect(response.status).toBe(204);
    });
  });
});