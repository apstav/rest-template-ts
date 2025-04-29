import mongoose from 'mongoose';
import { connectDB } from '../../models';

describe('Database Integration Tests', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the database successfully', async () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  it('should handle invalid database URI gracefully', async () => {
    const invalidUri = 'mongodb://invalid-uri';
    await expect(mongoose.connect(invalidUri)).rejects.toThrow();
  });

  it('should insert a document into the database', async () => {
    const Thermometer = mongoose.model('Thermometer');
    const newEntry = new Thermometer({
      deviceId: 'DEV-1234',
      temperature: 22.5,
      humidity: 50.0,
      batteryLevel: 80.0,
      lat: 37.9838,
      long: 23.7275,
    });
    const savedEntry = await newEntry.save();
    expect(savedEntry).toHaveProperty('_id');
  });

  it('should retrieve documents from the database', async () => {
    const Thermometer = mongoose.model('Thermometer');
    const entries = await Thermometer.find();
    expect(Array.isArray(entries)).toBe(true);
  });

  it('should delete a document from the database', async () => {
    const Thermometer = mongoose.model('Thermometer');
    const entry = await Thermometer.findOne();
    if (entry) {
      await Thermometer.deleteOne({ _id: entry._id });
      const deletedEntry = await Thermometer.findById(entry._id);
      expect(deletedEntry).toBeNull();
    }
  });
});
