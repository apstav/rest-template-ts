import {Thermometer} from '../models/index';
import { ThermometerInput, ThermometerOutput } from '../interfaces/index';
import { faker } from '../utils/index';

class ThermometerService {
  private toOutput(document: any): ThermometerOutput {
    const { _id, __v, ...rest } = document.toObject ? document.toObject() : document;
    return {
      ...rest,
      id: _id.toString(),
      recordedAt: rest.recordedAt || new Date()
    };
  }

  public async createThermometerData(data: ThermometerInput): Promise<ThermometerOutput> {
    const thermometer = new Thermometer(data);
    await thermometer.save();
    return this.toOutput(thermometer);
  }

  public async getAllThermometerData(): Promise<ThermometerOutput[]> {
    const documents = await Thermometer.find();
    return documents.map(this.toOutput);
  }

  public async getThermometerDataById(id: string): Promise<ThermometerOutput | null> {
    const document = await Thermometer.findById(id);
    return document ? this.toOutput(document) : null;
  }

  public async getThermometerDataByDeviceId(deviceId: string): Promise<ThermometerOutput[]> {
    const documents = await Thermometer.find({ deviceId });
    return documents.map(this.toOutput);
  }

  public async updateThermometerData(id: string, data: Partial<ThermometerInput>): Promise<ThermometerOutput | null> {
    const document = await Thermometer.findByIdAndUpdate(id, data, { new: true });
    return document ? this.toOutput(document) : null;
  }

  public async deleteThermometerData(id: string): Promise<ThermometerOutput | null> {
    const document = await Thermometer.findByIdAndDelete(id);
    return document ? this.toOutput(document) : null;
  }

  public async generateFakeData(count: number = 1): Promise<ThermometerOutput[]> {
    const fakeData = Array.from({ length: count }, () => faker.thermometerData());
    const created = await Thermometer.insertMany(fakeData);
    return created.map(this.toOutput);
  }
}

export default ThermometerService;