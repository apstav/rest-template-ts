import request from 'supertest';
import app from '../../app';

describe('PUT /api/thermometer/:id', () => {
  it('should update a specific thermometer entry', async () => {
    const id = "681de6a76ebcd8b77954b53b"; // Replace with a valid ID from your database
    const updatedEntry = { temperature: 30.0 };
    const response = await request(app).put(`/api/thermometer/${id}`).send(updatedEntry);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });

  it('should return 404 if the ID does not exist', async () => {
    const invalidId = '6810e38da1afcd87eb6f1b0a'; // Non-existent ID
    const response = await request(app).put(`/api/thermometer/${invalidId}`).send({ temperature: 30 });
    expect(response.status).toBe(404);
  });

  it('should return 400 for invalid data', async () => {
    const id = "68148f953ad597d6a5141357"; // Replace with a valid ID from your database
    const invalidEntry = { temperature: 'invalid' };
    const response = await request(app).put(`/api/thermometer/${id}`).send(invalidEntry);
    expect(response.status).toBe(400);
  });
});