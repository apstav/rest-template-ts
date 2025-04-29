import { Request, Response } from 'express';
import { ThermometerService } from '../services/index';
import { ThermometerInput } from '../interfaces/index';
import { logger, BadRequestError, NotFoundError, BaseError } from '../utils/index';

class ThermometerController {
  private readonly service: ThermometerService = new ThermometerService();

  private handleError(res: Response, error: Error): void {
    if (error instanceof BaseError) {
      logger.error(`[${error.name}] ${error.message}`, { stack: error.stack });
      res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    } else {
      logger.error(`[UnexpectedError] ${error.message}`, { stack: error.stack });
      res.status(500).json({
        success: false,
        error: 'An unexpected error occurred',
      });
    }
  }

  public createThermometerData = async (req: Request, res: Response): Promise<void> => {
    const data: ThermometerInput = req.body;

    try {
      logger.info('Creating new thermometer data', { data });
      const newData = await this.service.createThermometerData(data);

      logger.info('Successfully created thermometer data', { id: newData.id });
      res.status(201).json({
        success: true,
        data: newData,
      });
    } catch (error) {
      logger.error('Failed to create thermometer data', { error });
      this.handleError(res, error as Error);
    }
  };

  public getAllThermometerData = async (_req: Request, res: Response): Promise<void> => {
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
      logger.error('Failed to fetch thermometer data', { error });
      this.handleError(res, error as Error);
    }
  };

  public getThermometerDataById = async (req: Request, res: Response): Promise<void> => {
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
      logger.error(`Failed to fetch data for ID: ${id}`, { error });
      this.handleError(res, error as Error);
    }
  };

  public getThermometerDataByDeviceId = async (req: Request, res: Response): Promise<void> => {
    const { deviceId } = req.params;

    try {
      logger.info(`Fetching thermometer data for device ID: ${deviceId}`);
      const data = await this.service.getThermometerDataByDeviceId(deviceId);

      logger.info(`Found ${data.length} records for device ID: ${deviceId}`);
      res.status(200).json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      logger.error(`Failed to fetch data for device ID: ${deviceId}`, { error });
      this.handleError(res, error as Error);
    }
  };

  public updateThermometerData = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateData: Partial<ThermometerInput> = req.body;

    try {
      logger.info(`Updating thermometer data for ID: ${id}`, { updateData });

      if (Object.keys(updateData).length === 0) {
        throw new BadRequestError('No update data provided');
      }

      const result = await this.service.updateThermometerData(id, updateData);

      if (!result || result.count === 0) {
        logger.warn(`No data updated for ID: ${id}`);
        throw new NotFoundError(`Thermometer data with ID ${id} not found`);
      }

      logger.info(`Successfully updated data for ID: ${id}`, {
        updatedFields: Object.keys(updateData),
      });

      res.status(200).json({
        success: true,
        message: 'Data updated successfully',
        updatedId: id,
        updatedFields: Object.keys(updateData),
      });
    } catch (error) {
      logger.error(`Failed to update data for ID: ${id}`, { error, updateData });
      this.handleError(res, error as Error);
    }
  };

  public deleteThermometerData = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      logger.info(`Deleting thermometer data for ID: ${id}`);
      const result = await this.service.deleteThermometerData(id);

      if (!result || result.count === 0) {
        logger.warn(`No data deleted for ID: ${id}`);
        throw new NotFoundError(`Thermometer data with ID ${id} not found`);
      }

      logger.info(`Successfully deleted data for ID: ${id}`);
      res.status(200).json({
        success: true,
        message: 'Data deleted successfully',
        deletedId: id,
      });
    } catch (error) {
      logger.error(`Failed to delete data for ID: ${id}`, { error });
      this.handleError(res, error as Error);
    }
  };

  public generateFakeData = async (req: Request, res: Response): Promise<void> => {
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
      logger.error('Failed to generate fake data', { error, requestedCount: count });
      this.handleError(res, error as Error);
    }
  };
}

export default ThermometerController;
