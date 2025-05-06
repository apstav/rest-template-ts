import  ThermometerService  from './thermometer.service';
import { ThermometerFacade } from './facade';

export class ServiceFactory {
  public static createThermometerService(): ThermometerService {
    return new ThermometerService();
  }

  public static createThermometerFacade(): ThermometerFacade {
    return new ThermometerFacade();
  }
}