// import mongoose from 'mongoose';

// interface ThermometerDocument extends mongoose.Document {
//   deviceId: string;
//   temperature: number;
//   humidity?: number;
//   batteryLevel: number;
//   location: string;
//   recordedAt: Date;
// }

// const ThermometerSchema = new mongoose.Schema({
//   deviceId: {
//     type: String,
//     required: true,
//   },
//   temperature: {
//     type: Number,
//     required: true,
//   },
//   humidity: {
//     type: Number,
//   },
//   batteryLevel: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 100,
//   },
//   long: {
//     type: Number,
//     required: true,
//   },
//   lat: {
//     type: Number,
//     required: true,
//   },
//   recordedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Thermometer = mongoose.model<ThermometerDocument>('Thermometer', ThermometerSchema);

// export default Thermometer;
