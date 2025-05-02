import Joi from 'joi';

export const createThermometerSchema = Joi.object({
  deviceId: Joi.string().required(),
  temperature: Joi.number().required(),
  humidity: Joi.number().min(0).max(100).allow(null),
  batteryLevel: Joi.number().min(0).max(100).required(),
  lat: Joi.number().required(),
  long: Joi.number().required(),
  recordedAt: Joi.date().optional(),
});

export const updateThermometerSchema = Joi.object({
  temperature: Joi.number().optional(),
  humidity: Joi.number().min(0).max(100).allow(null).optional(),
  batteryLevel: Joi.number().min(0).max(100).optional(),
  lat: Joi.number().optional(),
  long: Joi.number().optional(),
}).min(1); // Ensure at least one field is provided

export const idParamSchema = Joi.object({
  id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(), // MongoDB ObjectId format
});