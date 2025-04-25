import Thermometer from '../models/thermometer.model';
import { ThermometerInput, ThermometerOutput } from '../interfaces/thermometer.interface';
import { faker } from '../utils/faker';

class ThermometerService {
  public async createThermometerData(data: ThermometerInput): Promise<ThermometerOutput> {
    const created = await Thermometer.create({
      ...data,
      recordedAt: data.recordedAt || new Date() // Ensure recordedAt is always set
    });
    return this.toOutput(created);
  }

  public async getAllThermometerData(): Promise<ThermometerOutput[]> {
    const allData = await Thermometer.findAll();
    return allData.map(this.toOutput);
  }

  public async getThermometerDataById(id: string): Promise<ThermometerOutput | null> {
    const data = await Thermometer.findByPk(id);
    return data ? this.toOutput(data) : null;
  }

  public async getThermometerDataByDeviceId(deviceId: string): Promise<ThermometerOutput[]> {
    const data = await Thermometer.findAll({ where: { deviceId } });
    return data.map(this.toOutput);
  }

  public async updateThermometerData(id: string, data: Partial<ThermometerInput>): Promise<[number]> {
    return await Thermometer.update(data, { where: { id } });
  }

  public async deleteThermometerData(id: string): Promise<number> {
    return await Thermometer.destroy({ where: { id } });
  }

  public async generateFakeData(count: number = 1): Promise<ThermometerOutput[]> {
    const fakeData = Array.from({ length: count }, () => ({
      ...faker.thermometerData(),
      recordedAt: new Date() // Ensure recordedAt is set
    }));
    const created = await Thermometer.bulkCreate(fakeData);
    return created.map(this.toOutput);
  }

  private toOutput(model: Thermometer): ThermometerOutput {
    return {
      id: model.id,
      deviceId: model.deviceId,
      temperature: model.temperature,
      humidity: model.humidity ?? undefined,
      batteryLevel: model.batteryLevel,
      location: model.location,
      recordedAt: model.recordedAt
    };
  }
}

export default ThermometerService;