import { MongoClient, Db, Collection } from 'mongodb';
import { client } from '../../config/config';

describe('Database Integration Tests', () => {
  let db: Db;
  let collection: Collection;

  beforeAll(async () => {
    await client.connect();
    db = client.db(); 
    collection = db.collection('thermometers'); 
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(async () => {
    await collection.deleteMany({}); 
  });

  it('should connect to the database successfully', async () => {
    expect(client.db()).toBeDefined();
  });

  it('should insert a document into the database', async () => {
    const newEntry = {
      deviceId: 'DEV-1234',
      temperature: 22.5,
      humidity: 50.0,
      batteryLevel: 80.0,
      lat: 37.9838,
      long: 23.7275,
    };
    const result = await collection.insertOne(newEntry);
    expect(result.insertedId).toBeDefined();
  });

  it('should retrieve documents from the database', async () => {
    const newEntry = {
      deviceId: 'DEV-1234',
      temperature: 22.5,
      humidity: 50.0,
      batteryLevel: 80.0,
      lat: 37.9838,
      long: 23.7275,
    };
    await collection.insertOne(newEntry);

    const entries = await collection.find().toArray();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBe(1);
    expect(entries[0].deviceId).toBe('DEV-1234');
  });

  it('should delete a document from the database', async () => {
    const newEntry = {
      deviceId: 'DEV-1234',
      temperature: 22.5,
      humidity: 50.0,
      batteryLevel: 80.0,
      lat: 37.9838,
      long: 23.7275,
    };
    const result = await collection.insertOne(newEntry);

    await collection.deleteOne({ _id: result.insertedId });
    const deletedEntry = await collection.findOne({ _id: result.insertedId });
    expect(deletedEntry).toBeNull();
  });

  it('should handle invalid database operations gracefully', async () => {
    const invalidCollection = db.collection('invalid_collection');
    await expect(invalidCollection.findOne({})).resolves.toBeNull();
  });
});
