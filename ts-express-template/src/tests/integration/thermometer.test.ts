// import { Request, Response, NextFunction } from 'express';
// import ThermometerController from '../../controllers/thermometer.controller';
// import { ThermometerService } from '../../services';
// import { NotFoundError, BadRequestError } from '../../utils';

// jest.mock('../../services');

// describe('ThermometerController Unit Tests', () => {
//   let controller: ThermometerController;
//   let serviceMock: jest.Mocked<ThermometerService>;
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let next: jest.MockedFunction<NextFunction>;

//   beforeEach(() => {
//     serviceMock = new ThermometerService() as jest.Mocked<ThermometerService>;
//     controller = new ThermometerController();
//     (controller as any)['service'] = serviceMock;

//     req = {};
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//       send: jest.fn(),
//     };
//     next = jest.fn();
//   });

//   describe('createThermometerData', () => {
//     it('should create new thermometer data', async () => {
//       const body = {
//         deviceId: 'DEV-1234',
//         temperature: 22.5,
//         humidity: 45.0,
//         batteryLevel: 85.0,
//         lat: 37.12,
//         long: 23.12,
//       };
//       req.body = body;

//       const result = { ...body, id: '12345', recordedAt: new Date(), count: 1 };
//       serviceMock.createThermometerData.mockResolvedValue(result);

//       await controller.createThermometerData(req as Request, res as Response, next);

//       expect(serviceMock.createThermometerData).toHaveBeenCalledWith(body);
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({ success: true, data: result });
//     });

//     it('should handle validation error', async () => {
//       req.body = {}; // missing required fields

//       await controller.createThermometerData(req as Request, res as Response, next);

//       expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
//     });
//   });

//   describe('getThermometerDataById', () => {
//     it('should return thermometer data by ID', async () => {
//       req.params = { id: 'abc123' };
//       const data = { id: 'abc123', temperature: 23 };
//       serviceMock.getThermometerDataById.mockResolvedValue(data);

//       await controller.getThermometerDataById(req as Request, res as Response, next);

//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ success: true, data });
//     });

//     it('should call next with NotFoundError', async () => {
//       req.params = { id: 'not-found' };
//       serviceMock.getThermometerDataById.mockResolvedValue(null);

//       await controller.getThermometerDataById(req as Request, res as Response, next);

//       expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
//     });
//   });

//   describe('updateThermometerData', () => {
//     it('should update thermometer data', async () => {
//       req.params = { id: '12345' };
//       req.body = { temperature: 25.0 };

//       serviceMock.updateThermometerData.mockResolvedValue(true);

//       await controller.updateThermometerData(req as Request, res as Response, next);

//       expect(serviceMock.updateThermometerData).toHaveBeenCalledWith('12345', { temperature: 25.0 });
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({
//         success: true,
//         message: 'Data updated successfully',
//         updatedId: '12345',
//       });
//     });

//     it('should return validation error', async () => {
//       req.params = { id: '12345' };
//       req.body = {}; // Invalid update payload

//       await controller.updateThermometerData(req as Request, res as Response, next);

//       expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
//     });

//     it('should handle NotFoundError on update', async () => {
//       req.params = { id: 'not-found' };
//       req.body = { temperature: 25.0 };
//       serviceMock.updateThermometerData.mockResolvedValue(null);

//       await controller.updateThermometerData(req as Request, res as Response, next);

//       expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
//     });
//   });

//   describe('deleteThermometerData', () => {
//     it('should delete thermometer data', async () => {
//       req.params = { id: '12345' };
//       serviceMock.deleteThermometerData.mockResolvedValue(true);

//       await controller.deleteThermometerData(req as Request, res as Response, next);

//       expect(serviceMock.deleteThermometerData).toHaveBeenCalledWith('12345');
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.send).toHaveBeenCalled();
//     });

//     it('should call next with NotFoundError if not found', async () => {
//       req.params = { id: '404' };
//       serviceMock.deleteThermometerData.mockResolvedValue(null);

//       await controller.deleteThermometerData(req as Request, res as Response, next);

//       expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
//     });
//   });

//   describe('getAllThermometerData', () => {
//     it('should fetch all thermometer data', async () => {
//       const data = [
//         { id: '1', deviceId: 'DEV-1', temperature: 20 },
//         { id: '2', deviceId: 'DEV-2', temperature: 22 },
//       ];
//       serviceMock.getAllThermometerData.mockResolvedValue(data);

//       await controller.getAllThermometerData(req as Request, res as Response, next);

//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({
//         success: true,
//         count: 2,
//         data,
//       });
//     });
//   });
// });
