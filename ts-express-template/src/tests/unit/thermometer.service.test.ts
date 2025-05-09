import { ThermometerService } from '../../services/index';
import { client } from '../../config/config';

jest.mock('../../config/config', () => ({
  client: {
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        findOneAndDelete: jest.fn(),
        insertMany: jest.fn(),
      }),
    }),
  },
}));

describe('ThermometerService', () => {
  let thermometerService: ThermometerService;
  let mockCollection: any;

  beforeEach(() => {
    thermometerService = new ThermometerService();
    mockCollection = client.db().collection('thermometers');
    jest.clearAllMocks();
  });

  describe('createThermometerData', () => {
    it('should create new thermometer data', async () => {
      const mockData = {
        deviceId: 'DEV-1234',
        temperature: 22.5,
        humidity: 45.0,
        batteryLevel: 85.0,
        long: 37.12,
        lat: 23.12,
        recordedAt: new Date(),
      };
      const mockResult = { insertedId: 'mocked-id' };
      mockCollection.insertOne.mockResolvedValue(mockResult);

      const result = await thermometerService.createThermometerData(mockData);

      expect(result).toEqual({ ...mockData, id: 'mocked-id' });
      expect(mockCollection.insertOne).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getAllThermometerData', () => {
    it('should return all thermometer data', async () => {
      const mockDocs = [
        { _id: '681df6e0848affeb8670e926', deviceId: 'A', temperature: 20 },
        { _id: '2', deviceId: 'B', temperature: 25 },
      ];
      mockCollection.find.mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockDocs),
      });

      const result = await thermometerService.getAllThermometerData();

      expect(result).toEqual([
        { id: '1', deviceId: 'A', temperature: 20 },
        { id: '2', deviceId: 'B', temperature: 25 },
      ]);
      expect(mockCollection.find).toHaveBeenCalled();
    });
  });

  describe('getThermometerDataById', () => {
    it('should return thermometer data by id', async () => {
      const mockDoc = { _id: '1', deviceId: 'X', temperature: 30 };
      mockCollection.findOne.mockResolvedValue(mockDoc);

      const result = await thermometerService.getThermometerDataById('1');

      expect(result).toEqual({ id: '1', deviceId: 'X', temperature: 30 });
      expect(mockCollection.findOne).toHaveBeenCalledWith({ _id: expect.any(Object) });
    });

    it('should return null if data not found', async () => {
      mockCollection.findOne.mockResolvedValue(null);

      const result = await thermometerService.getThermometerDataById('123');

      expect(result).toBeNull();
    });
  });

  describe('updateThermometerData', () => {
    it('should update and return thermometer data', async () => {
      const mockDoc = { _id: '681df6e0848affeb8670e926', temperature: 30 };
      mockCollection.findOneAndUpdate.mockResolvedValue({ value: mockDoc });

      const result = await thermometerService.updateThermometerData('681df6e0848affeb8670e926', { temperature: 30 });

      expect(result).toEqual({ id: '681df6e0848affeb8670e926', temperature: 30 });
      expect(mockCollection.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: expect.any(Object) },
        { $set: { temperature: 30 } },
        { returnDocument: 'after', upsert: false },
      );
    });

    it('should throw NotFoundError if update fails', async () => {
      mockCollection.findOneAndUpdate.mockResolvedValue(null);

      await expect(thermometerService.updateThermometerData('681df6e0848affeb8670e926', { temperature: 30 })).rejects.toThrow(
        'Thermometer data with ID 1 not found',
      );
    });
  });

  describe('deleteThermometerData', () => {
    it('should delete and return thermometer data', async () => {
      const mockDoc = { _id: '681df68b32fb3413cb488a50', deviceId: 'DEV-5678' };
      mockCollection.findOneAndDelete.mockResolvedValue({ value: mockDoc });

      const result = await thermometerService.deleteThermometerData('681df5e8c14f0f7e68274f1c');

      expect(result).toEqual({ id: '681df68b32fb3413cb488a50', deviceId: 'DEV-5678' });
      expect(mockCollection.findOneAndDelete).toHaveBeenCalledWith({ _id: expect.any(Object) });
    });

    it('should throw NotFoundError if delete fails', async () => {
      mockCollection.findOneAndDelete.mockResolvedValue(null);

      await expect(thermometerService.deleteThermometerData('681df68b32fb3413cb488a50')).rejects.toThrow(
        'Thermometer data with ID 681df5a89b71cf068226eeed not found',
      );
    });
  });
});