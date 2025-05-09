import { Router } from 'express';
import ThermometerController from '../controllers/thermometer.controller';

/**
 * @swagger
 * tags:
 *   name: Thermometer
 *   description: Thermometer data management
 */
class ThermometerRoutes {
  public router = Router();
  private controller = new ThermometerController();

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
    this.router.post('/', this.controller.createThermometerData);

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
    this.router.get('/', this.controller.getAllThermometerData);

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
    this.router.get('/:id', this.controller.getThermometerDataById);

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
    this.router.get('/device/:deviceId', this.controller.getThermometerDataByDeviceId);

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
    this.router.get('/device/:deviceId/time-range', this.controller.getThermometerDataByDeviceIdAndTimeRange);

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
    this.router.get('/device/:deviceId/latest', this.controller.getLatestThermometerDataByDeviceId);

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
    this.router.put('/:id', this.controller.updateThermometerData);

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
    this.router.delete('/:id', this.controller.deleteThermometerData);

    /**
     * @swagger
     * /thermometer/generate-fake-data:
     *   post:
     *     summary: Generate fake thermometer data
     *     tags: [Thermometer]
     */
    this.router.post('/generate-fake-data', this.controller.generateFakeData);
  }
}

export default ThermometerRoutes;
