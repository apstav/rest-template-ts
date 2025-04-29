import { MongoClient } from 'mongodb';

let client: MongoClient;

export async function connectToTestDB() {
  client = new MongoClient('mongodb://root:example@mongodb:27017');
  await client.connect();
  return client.db('device_db');
}

export async function disconnectTestDB() {
  if (client) {
    await client.close();
  }
}
import { expect } from 'chai';
import { before, after } from 'node:test';

describe('Database Connection', () => {
  let client: MongoClient;

  before(async () => {
    client = new MongoClient('mongodb://root:example@mongodb:27017');
    await client.connect();
  });

  after(async () => {
    await client.close();
  });

  it('should successfully connect to the database', async () => {
    try {
      const db = client.db('device_db'); 
      const collections = await db.listCollections().toArray();
      expect(collections).to.be.an('array');
    } catch (error) {
      expect.fail('Database connection failed');
    }
  });
});
