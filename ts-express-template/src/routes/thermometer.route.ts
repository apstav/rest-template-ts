import { Router } from 'express';
import { ServiceFactory } from '../services/factory';

/**
 * @swagger
 * tags:
 *   name: Thermometer
 *   description: Thermometer data management
 */
class ThermometerRoutes {
  public router = Router();
  private thermometerFacade = ServiceFactory.createThermometerFacade();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /thermometer:
     *   post:
     *     summary: Create new thermometer data
     *     tags: [Thermometer]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ThermometerInput'
     *     responses:
     *       201:
     *         description: Created thermometer data
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ThermometerOutput'
     */
    this.router.post('/', (req, res, next) => {
      this.thermometerFacade
        .createThermometer(req.body)
        .then((data) => res.status(201).json({ success: true, data }))
        .catch(next);
    });

    /**
     * @swagger
     * /thermometer:
     *   get:
     *     summary: Get all thermometer data
     *     tags: [Thermometer]
     *     responses:
     *       200:
     *         description: List of all thermometer data
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ThermometerOutput'
     */
    this.router.get('/', (_req, res, next) => {
      this.thermometerFacade
        .getAllThermometers()
        .then((data) => res.status(200).json({ success: true, data }))
        .catch(next);
    });

    /**
     * @swagger
     * /thermometer/{id}:
     *   get:
     *     summary: Get thermometer data by ID
     *     tags: [Thermometer]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Thermometer data ID
     *     responses:
     *       200:
     *         description: Thermometer data found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ThermometerOutput'
     */
    this.router.get('/:id', (req, res, next) => {
      this.thermometerFacade
        .getThermometerById(req.params.id)
        .then((data) => {
          if (!data) {
            res.status(404).json({ success: false, message: 'Thermometer data not found' });
          } else {
            res.status(200).json({ success: true, data });
          }
        })
        .catch(next);
    });

    /**
     * @swagger
     * /thermometer/device/{deviceId}:
     *   get:
     *     summary: Get thermometer data by device ID
     *     tags: [Thermometer]
     *     parameters:
     *       - in: path
     *         name: deviceId
     *         schema:
     *           type: string
     *         required: true
     *         description: Device ID
     *     responses:
     *       200:
     *         description: Thermometer data for the device
     */
    this.router.get('/device/:deviceId', (req, res, next) => {
      this.thermometerFacade
        .getThermometerByDeviceId(req.params.deviceId)
        .then((data) => {
          if (!data || data.length === 0) {
            res.status(404).json({ success: false, message: 'No data found for the device' });
          } else {
            res.status(200).json({ success: true, data });
          }
        })
        .catch(next);
    });

  
    /**
     * @swagger
     * /thermometer/device/{deviceId}/time-range:
     *   get:
     *     summary: Get thermometer data by device ID and time range
     *     tags: [Thermometer]
     *     parameters:
     *       - in: path
     *         name: deviceId
     *         schema:
     *           type: string
     *         required: true
     *         description: Device ID
     *       - in: query
     *         name: startTime
     *         schema:
     *           type: string
     *           format: date-time
     *         required: true
     *         description: Start time of the range
     *       - in: query
     *         name: endTime
     *         schema:
     *           type: string
     *           format: date-time
     *         required: true
     *         description: End time of the range
     *     responses:
     *       200:
     *         description: Thermometer data for the device within the time range
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ThermometerOutput'
     *       400:
     *         description: Invalid input parameters
     *       404:
     *         description: No data found
     */
    this.router.get('/device/:deviceId/time-range', (req, res, next) => {
      const { deviceId } = req.params;
      const { startTime, endTime } = req.query;

      this.thermometerFacade
        .getThermometerByDeviceIdAndTimeRange(deviceId, new Date(startTime as string), new Date(endTime as string))
        .then((data) => {
          if (!data || data.length === 0) {
            res.status(404).json({ success: false, message: 'No data found for the specified device and time range' });
          } else {
            res.status(200).json({ success: true, data });
          }
        })
        .catch(next);
    });

    /**
 * @swagger
 * /thermometer/device/{deviceId}/latest:
 *   get:
 *     summary: Get the latest thermometer data by device ID
 *     tags: [Thermometer]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Latest thermometer data for the device
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ThermometerOutput'
 *       404:
 *         description: No data found
 */
this.router.get('/device/:deviceId/latest', (req, res, next) => {
  this.thermometerFacade
    .getLatestThermometerDataByDeviceId(req.params.deviceId)
    .then((data) => {
      if (!data) {
        res.status(404).json({ success: false, message: 'No data found for the device' });
      } else {
        res.status(200).json({ success: true, data });
      }
    })
    .catch(next);
});

    /**
     * @swagger
     * /thermometer/{id}:
     *   put:
     *     summary: Update thermometer data
     *     tags: [Thermometer]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Thermometer data ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ThermometerUpdateInput'
     */
    this.router.put('/:id', (req, res, next) => {
      this.thermometerFacade
        .updateThermometer(req.params.id, req.body)
        .then((data) => res.status(200).json({ success: true, data }))
        .catch(next);
    });

    /**
     * @swagger
     * /thermometer/{id}:
     *   delete:
     *     summary: Delete thermometer data
     *     tags: [Thermometer]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: Thermometer data ID
     */
    this.router.delete('/:id', (req, res, next) => {
      this.thermometerFacade
        .deleteThermometer(req.params.id)
        .then(() => res.status(200).json({ success: true, message: 'Deleted successfully' }))
        .catch(next);
    });

    /**
     * @swagger
     * /thermometer/generate-fake-data:
     *   post:
     *     summary: Generate fake thermometer data
     *     tags: [Thermometer]
     */
    this.router.post('/generate-fake-data', (_req, res, next) => {
      this.thermometerFacade
        .generateFakeData()
        .then((data) => res.status(200).json({ success: true, data }))
        .catch(next);
    });
  }
}

export default ThermometerRoutes;
