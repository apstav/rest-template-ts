import { ThermometerService } from '../../services/index';
import { Thermometer } from '../../models/index';
import { faker } from '../../utils/index';

jest.mock('../../models/thermometer.model');
jest.mock('../../utils/index', () => ({
  faker: {
    thermometerData: jest.fn()
  }
}));

describe('ThermometerService', () => {
  let thermometerService: ThermometerService;

  beforeEach(() => {
    thermometerService = new ThermometerService();
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
        save: jest.fn().mockResolvedValue(true),
        toObject: function () {
          return { ...this, _id: 'mocked-id', __v: 0 };
        }
      };

      (Thermometer as any).mockImplementation(() => mockData);

      const result = await thermometerService.createThermometerData(mockData);
      expect(result).toHaveProperty('id', 'mocked-id');
      expect(mockData.save).toHaveBeenCalled();
    });
  });

  describe('getAllThermometerData', () => {
    it('should return all thermometer data', async () => {
      const mockDocs = [
        { toObject: () => ({ _id: '1', __v: 0, deviceId: 'A' }) },
        { toObject: () => ({ _id: '2', __v: 0, deviceId: 'B' }) }
      ];
      (Thermometer.find as jest.Mock).mockResolvedValue(mockDocs);

      const result = await thermometerService.getAllThermometerData();
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1');
    });
  });

  describe('getThermometerDataById', () => {
    it('should return thermometer data by id', async () => {
      const mockDoc = {
        toObject: () => ({ _id: '1', __v: 0, deviceId: 'X' })
      };
      (Thermometer.findById as jest.Mock).mockResolvedValue(mockDoc);

      const result = await thermometerService.getThermometerDataById('1');
      expect(result).toHaveProperty('id', '1');
    });

    it('should return null if data not found', async () => {
      (Thermometer.findById as jest.Mock).mockResolvedValue(null);
      const result = await thermometerService.getThermometerDataById('123');
      expect(result).toBeNull();
    });
  });

  describe('getThermometerDataByDeviceId', () => {
    it('should return thermometer data by device id', async () => {
      const mockDocs = [
        { toObject: () => ({ _id: '1', __v: 0, deviceId: 'DEV-1' }) }
      ];
      (Thermometer.find as jest.Mock).mockResolvedValue(mockDocs);

      const result = await thermometerService.getThermometerDataByDeviceId('DEV-1');
      expect(result).toHaveLength(1);
      expect(result[0].deviceId).toBe('DEV-1');
    });
  });

  describe('updateThermometerData', () => {
    it('should update and return thermometer data', async () => {
      const mockDoc = {
        toObject: () => ({ _id: '1', __v: 0, temperature: 30 })
      };
      (Thermometer.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockDoc);

      const result = await thermometerService.updateThermometerData('1', { temperature: 30 });
      expect(result).toHaveProperty('temperature', 30);
    });

    it('should return null if update fails', async () => {
      (Thermometer.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      const result = await thermometerService.updateThermometerData('1', { temperature: 30 });
      expect(result).toBeNull();
    });
  });

  describe('deleteThermometerData', () => {
    it('should delete and return thermometer data', async () => {
      const mockDoc = {
        toObject: () => ({ _id: '1', __v: 0, deviceId: 'DEV' })
      };
      (Thermometer.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDoc);

      const result = await thermometerService.deleteThermometerData('1');
      expect(result?.id).toBe('1');
    });

    it('should return null if no document found to delete', async () => {
      (Thermometer.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      const result = await thermometerService.deleteThermometerData('1');
      expect(result).toBeNull();
    });
  });

  describe('generateFakeData', () => {
    it('should generate and return fake data', async () => {
      const mockData = [
        { _id: '1', deviceId: 'F1', __v: 0 },
        { _id: '2', deviceId: 'F2', __v: 0 }
      ];
      const fakeDocs = mockData.map((doc) => ({
        ...doc,
        toObject: () => doc
      }));

      (faker.thermometerData as jest.Mock).mockImplementation(() => ({
        deviceId: 'F1',
        temperature: 20,
        humidity: 50,
        batteryLevel: 90,
        long: 0,
        lat: 0
      }));

      (Thermometer.insertMany as jest.Mock).mockResolvedValue(fakeDocs);

      const result = await thermometerService.generateFakeData(2);
      expect(result).toHaveLength(2);
    });
  });
});
