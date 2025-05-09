import { not } from 'joi';
import { client } from '../config/config'; 
import { ThermometerInput, ThermometerOutput } from '../interfaces/index';
import { ObjectId } from 'mongodb';
import { NotFoundError } from '../utils/errors/notFoundError';



class ThermometerService {
  private collection = client.db().collection('thermometers');

  private toOutput(document: any): ThermometerOutput {
    const { _id, ...rest } = document;
    return { ...rest, id: _id.toString() };
  }

  public async getAllThermometerData(): Promise<ThermometerOutput[]> {
    const documents = await this.collection.find().toArray();
    return documents.map(this.toOutput);
  }

  public async getThermometerDataById(id: string): Promise<ThermometerOutput | null> {
    const document = await this.collection.findOne({ _id: new ObjectId(id) });
    return document ? this.toOutput(document) : null;
  }

  public async getThermometerDataByDeviceId(deviceId: string): Promise<ThermometerOutput[]> {
    const documents = await this.collection.find({ deviceId }).toArray();
    return documents.map(this.toOutput);
  }

  public async getLatestThermometerDataByDeviceId(deviceId: string): Promise<ThermometerOutput | null> {
  const document = await this.collection
    .find({ deviceId })
    .sort({ recordedAt: -1 })
    .limit(1)
    .next();
  return document ? this.toOutput(document) : null;
  }

  public async getThermometerDataByDeviceIdAndTimeRange(
    deviceId: string,
    startTime: Date,
    endTime: Date
  ): Promise<ThermometerOutput[]> {
    const documents = await this.collection
      .find({
        deviceId,
        recordedAt: { $gte: startTime, $lte: endTime },
      })
      .toArray();
    return documents.map(this.toOutput);
  }

  public async createThermometerData(data: ThermometerInput): Promise<ThermometerOutput> {
    const result = await this.collection.insertOne(data);
    return this.toOutput({ _id: result.insertedId, ...data });
  }

  // public async updateThermometerData(id: string, data: Partial<ThermometerInput>): Promise<ThermometerOutput | null> {
  //   const result = await this.collection.findOneAndUpdate(
  //     { _id: new ObjectId(id) },
  //     { $set: data },
  //     { returnDocument: 'after' }
  //   );
  //   if (!result) {
  //     return null; // Handle the case where result is null
  //   }
  //   return result.value ? this.toOutput(result.value) : null;
  // }

  // public async deleteThermometerData(id: string): Promise<ThermometerOutput | null> {
  //   const result = await this.collection.findOneAndDelete({ _id: new ObjectId(id) });
  //   if (!result) {
  //     throw new NotFoundError(`Thermometer data with ID ${id} not found`);
  //   }
  //   return result.value ? this.toOutput(result.value) : null;
  //   ;
  // }
  public async updateThermometerData(
  id: string,
  data: Partial<ThermometerInput>
): Promise<ThermometerOutput | null> {
  const result = await this.collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    {
      returnDocument: 'after', // Keep using 'after' to get the updated document
      upsert: false            // Prevents inserting if not found (optional but explicit)
    }
  );

  if (!result) {
    throw new NotFoundError; // No document was updated
  }

  return this.toOutput(result.value);
}

public async deleteThermometerData(id: string): Promise<ThermometerOutput | null> {
  const result = await this.collection.findOneAndDelete({ _id: new ObjectId(id) });

  if (!result) {
    throw new NotFoundError(`Thermometer data with ID ${id} not found`);
  }

  return this.toOutput(result.value);
}

  public async generateFakeData(count: number): Promise<ThermometerOutput[]> {
    const fakeData: ThermometerInput[] = Array.from({ length: count }, (_, i) => ({
      deviceId: `device-${i + 1}`,
      temperature: parseFloat((Math.random() * 50).toFixed(2)), // Random temperature between 0 and 50
      humidity: Math.random() > 0.5 ? parseFloat((Math.random() * 100).toFixed(2)) : null, // Random humidity or null
      batteryLevel: parseFloat((Math.random() * 100).toFixed(2)), // Random battery level between 0 and 100
      long: parseFloat((Math.random() * 180 - 90).toFixed(6)), // Random longitude between -90 and 90
      lat: parseFloat((Math.random() * 360 - 180).toFixed(6)), // Random latitude between -180 and 180
      recordedAt: new Date(),
    }));

    const result = await this.collection.insertMany(fakeData);
    return fakeData.map((data, index) => this.toOutput({ _id: result.insertedIds[index], ...data }));
  }

}

export default ThermometerService;


