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
  public thermometerController = new ThermometerController();

  constructor() {
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
     *       500:
     *         description: Server error
     */
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
     *       500:
     *         description: Server error
     */
    this.router.post('/', this.thermometerController.createThermometerData);

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
    this.router.get('/', this.thermometerController.getAllThermometerData);

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
     *               $ref: '#/components/schemas/TermometerOutput'
     *       404:
     *         description: Thermometer data not found
     */
    this.router.get('/:id', this.thermometerController.getThermometerDataById);

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
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ThermometerOutput'
     *       404:
     *         description: No data found for the device
     */
    this.router.get('/device/:deviceId', this.thermometerController.getThermometerDataByDeviceId);

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
 *     responses:
 *       200:
 *         description: Updated thermometer data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ThermometerOutput'
 *       404:
 *         description: Thermometer data not found
 */
    this.router.put('/:id', this.thermometerController.updateThermometerData);

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
     *     responses:
     *       200:
     *         description: Deleted successfully
     *       404:
     *         description: Thermometer data not found
     */
    this.router.delete('/:id', this.thermometerController.deleteThermometerData);

    /**
     * @swagger
     * /thermometer/generate-fake-data:
     *   post:
     *     summary: Generate fake thermometer data
     *     tags: [Thermometer]
     *     responses:
     *       200:
     *         description: Fake thermometer data generated
     */
    this.router.post('/generate-fake-data', this.thermometerController.generateFakeData);
  }
}

export default ThermometerRoutes;
