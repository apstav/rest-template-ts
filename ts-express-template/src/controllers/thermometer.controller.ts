import { Request, Response } from 'express';
import ThermometerService from '../services/thermometer.service';
import { ThermometerInput, ThermometerOutput } from '../interfaces/thermometer.interface';
import { logger } from '../utils/logger';

class ThermometerController {
  public thermometerService = new ThermometerService();

  private handleError(res: Response, error: unknown): void {
    if (error instanceof Error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    } else {
      logger.error('An unknown error occurred');
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }

  public createThermometerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: ThermometerInput = req.body;
      const newData = await this.thermometerService.createThermometerData(data);
      res.status(201).json(newData);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public getAllThermometerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.thermometerService.getAllThermometerData();
      res.status(200).json(data);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public getThermometerDataById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const data = await this.thermometerService.getThermometerDataById(id);
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public getThermometerDataByDeviceId = async (req: Request, res: Response): Promise<void> => {
    try {
      const deviceId = req.params.deviceId;
      const data = await this.thermometerService.getThermometerDataByDeviceId(deviceId);
      res.status(200).json(data);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public updateThermometerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const data: Partial<ThermometerInput> = req.body;
      const updatedCount = await this.thermometerService.updateThermometerData(id, data);
      if (updatedCount[0] > 0) {
        res.status(200).json({ message: 'Data updated successfully' });
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public deleteThermometerData = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deletedCount = await this.thermometerService.deleteThermometerData(id);
      if (deletedCount > 0) {
        res.status(200).json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public generateFakeData = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = parseInt(req.query.count as string) || 10;
      if (isNaN(count) || count < 1 || count > 100) {
        res.status(400).json({ message: 'Count must be between 1 and 100' });
        return;
      }
      const data = await this.thermometerService.generateFakeData(count);
      res.status(201).json(data);
    } catch (error) {
      this.handleError(res, error);
    }
  };
}

export default ThermometerController;