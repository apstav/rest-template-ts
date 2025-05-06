import { Request, Response, NextFunction } from 'express';
import { ThermometerService } from '../services/index';
import { ThermometerInput } from '../interfaces/index';
import { logger, BadRequestError, NotFoundError, BaseError } from '../utils/index';
import { createThermometerSchema, updateThermometerSchema, idParamSchema } from '../utils/thermometer.validator';
import Joi from 'joi';
import { Logger } from 'winston';

class ThermometerController {
  private readonly service: ThermometerService = new ThermometerService();

  private validate(schema: Joi.Schema, data: any): void {
    const { error } = schema.validate(data);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }
  }

  public createThermometerData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      this.validate(createThermometerSchema, req.body);

      logger.info('Creating new thermometer data', { data: req.body });
      const newData = await this.service.createThermometerData(req.body);

      logger.info('Successfully created thermometer data', { id: newData.id });
      res.status(201).json({
        success: true,
        data: newData,
      });
    } catch (error) {
      next(error); 
    }
  };

  public getAllThermometerData = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      logger.info('Fetching all thermometer data');
      const data = await this.service.getAllThermometerData();

      logger.info(`Successfully fetched ${data.length} records`);
      res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      next(error); 
    }
  };

  public getThermometerDataById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      logger.info(`Fetching thermometer data by ID: ${id}`);
      const data = await this.service.getThermometerDataById(id);

      if (!data) {
        logger.warn(`No data found for ID: ${id}`);
        throw new NotFoundError(`Thermometer data with ID ${id} not found`);
      }

      logger.info(`Successfully fetched data for ID: ${id}`);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error); 
    }
  };

  public getThermometerDataByDeviceId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deviceId } = req.params;

    try {
      logger.info(`Fetching thermometer data for device ID: ${deviceId}`);
      const data = await this.service.getThermometerDataByDeviceId(deviceId);
      if (!data || data.length === 0) {
        throw new NotFoundError(`Thermometer data with ID ${deviceId} not found`);
      }
      logger.info(`Found ${data.length} records for device ID: ${deviceId}`);
      res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      next(error); 
    }
  };

  public updateThermometerData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      this.validate(idParamSchema, req.params);
      this.validate(updateThermometerSchema, req.body);

      const { id } = req.params;
      logger.info(`Updating thermometer data for ID: ${id}`, { updateData: req.body });

      const result = await this.service.updateThermometerData(id, req.body);
      if (!result) {
        throw new NotFoundError(`Thermometer data with ID ${id} not found`);
      }
      
      logger.info(`Successfully updated data for ID: ${id}`);
      res.status(200).json({
        success: true,
        message: 'Data updated successfully',
        updatedId: id,
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteThermometerData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      this.validate(idParamSchema, req.params);

      const { id } = req.params;
      logger.info(`Deleting thermometer data for ID: ${id}`);

      const result = await this.service.deleteThermometerData(id);
      
      if (!result) {
        throw new NotFoundError(`Thermometer data with ID ${id} not found`);
      }

      logger.info(`Successfully deleted data for ID: ${id}`);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  public generateFakeData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const count = parseInt(req.query.count as string) || 10;

    try {
      if (isNaN(count) || count < 1 || count > 100) {
        throw new BadRequestError('Count must be between 1 and 100');
      }

      logger.info(`Generating ${count} fake data entries`);
      const data = await this.service.generateFakeData(count);

      logger.info(`Successfully generated ${data.length} fake entries`);
      res.status(201).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ThermometerController;
