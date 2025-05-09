import { Request, Response, NextFunction } from 'express';
import { ThermometerFacade } from '../services/facade';
import { logger, BadRequestError, NotFoundError } from '../utils/index';
import { createThermometerSchema, updateThermometerSchema, idParamSchema } from '../utils/thermometer.validator';
import Joi from 'joi';

class ThermometerController {
  private readonly facade: ThermometerFacade = new ThermometerFacade();

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
      const newData = await this.facade.createThermometer(req.body);

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
      const data = await this.facade.getAllThermometers();

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
      const data = await this.facade.getThermometerById(id);

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
      const data = await this.facade.getThermometerByDeviceId(deviceId);

      if (!data || data.length === 0) {
        throw new NotFoundError(`Thermometer data with device ID ${deviceId} not found`);
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

  public getLatestThermometerDataByDeviceId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deviceId } = req.params;

    try {
      logger.info(`Fetching latest thermometer data for device ID: ${deviceId}`);
      const data = await this.facade.getLatestThermometerDataByDeviceId(deviceId);

      if (!data) {
        throw new NotFoundError(`No data found for device ID ${deviceId}`);
      }

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  public getThermometerDataByDeviceIdAndTimeRange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { deviceId } = req.params;
      const { startTime, endTime } = req.query;

      if (!deviceId || !startTime || !endTime) {
        throw new BadRequestError('Missing required parameters: deviceId, startTime, or endTime');
      }

      const start = new Date(startTime as string);
      const end = new Date(endTime as string);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new BadRequestError('Invalid date format for startTime or endTime');
      }

      const data = await this.facade.getThermometerByDeviceIdAndTimeRange(deviceId, start, end);
      if (data.length === 0) {
        throw new NotFoundError(`No data found for device ID ${deviceId} in the specified time range`);
      }
      res.status(200).json({
        success: true,
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

      const result = await this.facade.updateThermometer(id, req.body);
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

  public deleteThermometerByDeviceId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { deviceId } = req.params;
  
    try {
      logger.info(`Deleting thermometer data for device ID: ${deviceId}`);
      const deletedCount = await this.facade.deleteThermometerByDeviceId(deviceId);
  
      logger.info(`Successfully deleted ${deletedCount} records for device ID: ${deviceId}`);
      res.status(200).json({
        success: true,
        message: `${deletedCount} records deleted for device ID: ${deviceId}`,
      });
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
      const data = await this.facade.generateFakeData(count);

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
