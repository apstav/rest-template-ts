import  ThermometerService  from './thermometer.service';
import { ThermometerInput, ThermometerOutput } from '../interfaces/thermometer.interface';

export class ThermometerFacade {
  private thermometerService: ThermometerService;

  constructor() {
    this.thermometerService = new ThermometerService();
  }

  public async getAllThermometers(): Promise<ThermometerOutput[]> {
    return this.thermometerService.getAllThermometerData();
  }

  public async createThermometer(data: ThermometerInput): Promise<ThermometerOutput> {
    return this.thermometerService.createThermometerData(data);
  }

  public async getThermometerById(id: string): Promise<ThermometerOutput | null> {
    return this.thermometerService.getThermometerDataById(id);
  }

  public async getLatestThermometerDataByDeviceId(deviceId: string): Promise<ThermometerOutput | null> {
  return this.thermometerService.getLatestThermometerDataByDeviceId(deviceId);
  }

  public async getThermometerByDeviceIdAndTimeRange(
    deviceId: string,
    startTime: Date,
    endTime: Date
  ): Promise<ThermometerOutput[]> {
    return this.thermometerService.getThermometerDataByDeviceIdAndTimeRange(deviceId, startTime, endTime);
  }

  public async getThermometerByDeviceId(deviceId: string): Promise<ThermometerOutput[]> {
    return this.thermometerService.getThermometerDataByDeviceId(deviceId);
  }

  public async updateThermometer(id: string, data: Partial<ThermometerInput>): Promise<ThermometerOutput | null> {
    return this.thermometerService.updateThermometerData(id, data);
  }

  public async deleteThermometer(id: string): Promise<ThermometerOutput | null> {
    return this.thermometerService.deleteThermometerData(id);
  }

  public async generateFakeData(count: number = 1): Promise<ThermometerOutput[]> {
    return this.thermometerService.generateFakeData(count);
  }
}