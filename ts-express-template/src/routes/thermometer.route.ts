import { Router } from 'express';
import ThermometerController from '../controllers/thermometer.controller';

class ThermometerRoutes {
  public router = Router();
  public thermometerController = new ThermometerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.thermometerController.createThermometerData);
    this.router.get('/', this.thermometerController.getAllThermometerData);
    this.router.get('/:id', this.thermometerController.getThermometerDataById);
    this.router.get('/device/:deviceId', this.thermometerController.getThermometerDataByDeviceId);
    this.router.put('/:id', this.thermometerController.updateThermometerData);
    this.router.delete('/:id', this.thermometerController.deleteThermometerData);
    this.router.post('/generate-fake-data', this.thermometerController.generateFakeData);
  }
}

export default ThermometerRoutes;