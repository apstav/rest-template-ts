import request from 'supertest';
import app from '../../app'; 

describe('Thermometer Integration Tests', () => {
    describe('GET /thermometer', () => {
        it('should return a list of thermometer data', async () => {
            const response = await request(app).get('/api/thermometer');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /thermometer', () => {
        it('should create a new thermometer entry', async () => {
            const newEntry = { temperature: 25, location: { lat: 37.7749, long: -122.4194 } };
            const response = await request(app).post('/api/thermometer').send(newEntry);
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(newEntry);
        });

        it('should return 400 for invalid data', async () => {
            const invalidEntry = { temperature: 'invalid', location: { lat: 'invalid', long: '' } };
            const response = await request(app).post('/api/thermometer').send(invalidEntry);
            expect(response.status).toBe(400);
        });
    });

    describe('GET /thermometer/:id', () => {
        it('should return a specific thermometer entry', async () => {
            const id = '680b6375f3989c544842bfeb'; // Replace with a valid ID from your database
            const response = await request(app).get(`/api/thermometer/${id}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', id);
        });

        it('should return 404 for a non-existent entry', async () => {
            const response = await request(app).get('/api/thermometer/9999');
            expect(response.status).toBe(404);
        });
    });

    describe('PUT /thermometer/:id', () => {
        it('should update a specific thermometer entry', async () => {
            const id = '680b6375f3989c544842bfeb'; // Replace with a valid ID from your database
            const updatedEntry = { temperature: 30, location: { lat: 40.7128, long: -74.0060 } };
            const response = await request(app).put(`/api/thermometer/${id}`).send(updatedEntry);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(updatedEntry);
        });

        it('should return 400 for invalid data', async () => {
            const id = '680b6375f3989c544842bfeb'; // Replace with a valid ID from your database
            const invalidEntry = { temperature: 'invalid', location: { lat: 'invalid', long: '' } };
            const response = await request(app).put(`/api/thermometer/${id}`).send(invalidEntry);
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /thermometer/:id', () => {
        it('should delete a specific thermometer entry', async () => {
            const id = '680b6375f3989c544842bfeb'; // Replace with a valid ID from your database
            const response = await request(app).delete(`/api/thermometer/${id}`);
            expect(response.status).toBe(204);
        });

        it('should return 404 for a non-existent entry', async () => {
            const response = await request(app).delete('/api/thermometer/9999');
            expect(response.status).toBe(404);
        });
    });
});