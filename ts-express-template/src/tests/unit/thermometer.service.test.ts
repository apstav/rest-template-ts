import ThermometerService from '../../services/thermometer.service';
import Thermometer from '../../models/thermometer.model';

jest.mock('../../models/thermometer.model');

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
        location: 'Living Room',
      };

      (Thermometer.create as jest.Mock).mockResolvedValue(mockData);

      const result = await thermometerService.createThermometerData(mockData);
      expect(result).toEqual(mockData);
      expect(Thermometer.create).toHaveBeenCalledWith(mockData);
    });
  });

  // Add more test cases for other methods
});