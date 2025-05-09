import request from 'supertest';
import app from '../../app';

describe('DELETE /api/thermometer/:id', () => {
  it('should delete a specific thermometer entry', async () => {
    const id = "681491c2eed4ed3dd65d3afe"; // Replace with a valid ID from your database
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