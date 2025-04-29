import { Request, Response } from 'express';
import ThermometerService from '../services/thermometer.service';
import { ThermometerInput } from '../interfaces/thermometer.interface';
import { logger } from '../utils/logger';
import { BadRequestError } from '../utils/errors/badRequestError';
import { NotFoundError } from '../utils/errors/notFoundError';
import { BaseError } from '../utils/errors/baseError';

class ThermometerController {
  public thermometerService = new ThermometerService();

  private handleError(res: Response, error: Error): void {
    if (error instanceof BaseError) {
      logger.error(`[${error.name}] ${error.message}`);
      res.status(error.statusCode).json({ message: error.message });
    } else {
      logger.error(`[UnexpectedError] ${error.stack || error.message}`);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }

  public createThermometerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: ThermometerInput = req.body;
      const newData = await this.thermometerService.createThermometerData(data);
      logger.info(`Created thermometer data with ID: ${newData.id}`);
      res.status(201).json(newData);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  public getAllThermometerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.thermometerService.getAllThermometerData();
      logger.info(`Fetched all thermometer data (Count: ${data.length})`);
      res.status(200).json(data);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  public getThermometerDataById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const data = await this.thermometerService.getThermometerDataById(id);
      if (data) {
        logger.info(`Fetched thermometer data by ID: ${id}`);
        res.status(200).json(data);
      } else {
        throw new NotFoundError(`Thermometer data with ID ${id} not found`);
      }
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  public getThermometerDataByDeviceId = async (req: Request, res: Response): Promise<void> => {
    try {
      const deviceId = req.params.deviceId;
      const data = await this.thermometerService.getThermometerDataByDeviceId(deviceId);
      logger.info(`Fetched thermometer data by Device ID: ${deviceId} (Count: ${data.length})`);
      res.status(200).json(data);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  public updateThermometerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data: Partial<ThermometerInput> = req.body;
      
      const result = await this.thermometerService.updateThermometerData(id, data);
      
      if (!result) {
        throw new Error('Update operation returned no result');
      }
      
      if (result.count > 0) {
        logger.info(`Updated thermometer data with ID: ${id}`);
        res.status(200).json({ 
          message: 'Data updated successfully',
          updatedId: id 
        });
      } else {
        throw new NotFoundError(`Thermometer data with ID ${id} not found`);
      }
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  public deleteThermometerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const result = await this.thermometerService.deleteThermometerData(id);
      
      if (!result) {
        throw new Error('No result returned from delete operation');
      }
      
      if (result.count > 0) {
        logger.info(`Deleted thermometer data with ID: ${id}`);
        res.status(200).json({ message: 'Data deleted successfully' });
      } else {
        throw new NotFoundError(`Thermometer data with ID ${id} not found`);
      }
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };

  public generateFakeData = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = parseInt(req.query.count as string) || 10;
      if (isNaN(count) || count < 1 || count > 100) {
        throw new BadRequestError('Count must be between 1 and 100');
      }
      const data = await this.thermometerService.generateFakeData(count);
      logger.info(`Generated ${count} fake thermometer data entries`);
      res.status(201).json(data);
    } catch (error) {
      this.handleError(res, error as Error);
    }
  };
}

export default ThermometerController;
