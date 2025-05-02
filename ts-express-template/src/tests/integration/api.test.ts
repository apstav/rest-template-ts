import request from 'supertest';
import app from '../../app';

describe('API Integration Tests', () => {
  describe('GET /api/thermometer', () => {
    it('should return all thermometer data', async () => {
      const response = await request(app).get('/api/thermometer');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

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
  });

  describe('GET /api/thermometer/:id', () => {
    it('should return a specific thermometer entry', async () => {
      const id = "6812292efc5c5db1be18bedd"; // Replace with a valid ID from your database
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

  describe('PUT /api/thermometer/:id', () => {
    it('should update a specific thermometer entry', async () => {
      const id = "6812292efc5c5db1be18bedd"; // Replace with a valid ID from your database
      const updatedEntry = { temperature: 30.0 };
      const response = await request(app).put(`/api/thermometer/${id}`).send(updatedEntry);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });

    it('should return 400 for invalid data', async () => {
      const id = "681205dae9583843cecd51c2"; // Replace with a valid ID from your database
      const invalidEntry = { temperature: 'invalid' };
      const response = await request(app).put(`/api/thermometer/${id}`).send(invalidEntry);
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/thermometer/:id', () => {
    it('should delete a specific thermometer entry', async () => {
      const id = "68122d86976a29542e5d9242"; // Replace with a valid ID from your database
      const response = await request(app).delete(`/api/thermometer/${id}`);
      expect(response.status).toBe(200);
    });

    it('should return 404 for a non-existent entry', async () => {
      const invalidId = "6810e38da1afcd87eb6f1b0a";
      const response = await request(app).delete(`/api/thermometer/${invalidId}`);
      expect(response.status).toBe(404);
    });
  });
});
