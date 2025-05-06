export class Config {
  public static readonly API_URL = process.env.API_URL || 'http://localhost:3000';
  public static readonly MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
}