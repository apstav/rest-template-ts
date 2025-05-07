import { client } from '../models/index';
import { ThermometerInput, ThermometerOutput } from '../interfaces/index';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

class ThermometerService {
  private collection = client.db().collection('thermometers');

  private toOutput(document: any): ThermometerOutput {
    const { _id, ...rest } = document;
    return { ...rest, id: _id.toString() };
  }

  public async createThermometerData(data: ThermometerInput): Promise<ThermometerOutput> {
    const result = await this.collection.insertOne(data);
    return this.toOutput({ _id: result.insertedId, ...data });
  }

  public async getAllThermometerData(): Promise<ThermometerOutput[]> {
    const documents = await this.collection.find().toArray();
    return documents.map(this.toOutput);
  }

  public async getThermometerDataById(id: string): Promise<ThermometerOutput | null> {
    const document = await this.collection.findOne({ _id: new ObjectId(id) }); // Use ObjectId here
    return document ? this.toOutput(document) : null;
  }

  public async updateThermometerData(id: string, data: Partial<ThermometerInput>): Promise<ThermometerOutput | null> {
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    );

    
    if (!result || !result.value) {
      return null;
    }

    return this.toOutput(result.value);
  }

  public async getThermometerDataByDeviceId(deviceId: string): Promise<ThermometerOutput[]> {
    const documents = await this.collection.find({ deviceId }).toArray();
    return documents.map(this.toOutput);
  }

  public async deleteThermometerData(id: string): Promise<ThermometerOutput[] | null> {
    const result = await this.collection.findOneAndDelete({ _id: new ObjectId(id) }); // Use ObjectId here
    //const result = await this.collection.deleteOne({ _id: new ObjectId(id) }); // Use ObjectId here
     return result ? [this.toOutput(result.value)] : null;
  }

  public async generateFakeData(count: number): Promise<void> {
  const fakeData: ThermometerInput[] = Array.from({ length: count }, (_, i) => ({
    deviceId: `device-${i + 1}`,
    temperature: parseFloat((Math.random() * 50).toFixed(2)), // Random temperature between 0 and 50
    humidity: parseFloat((Math.random() * 100).toFixed(2)), // Random humidity between 0 and 100
    batteryLevel: parseFloat((Math.random() * 100).toFixed(2)), // Random battery level between 0 and 100
    long: parseFloat((Math.random() * 180 - 90).toFixed(6)), // Random longitude between -90 and 90
    lat: parseFloat((Math.random() * 360 - 180).toFixed(6)), // Random latitude between -180 and 180
    timestamp: new Date(),
  }));

  await this.collection.insertMany(fakeData);
}
}

export default ThermometerService;