import { Router } from 'express';
import ThermometerRoutes from './thermometer.route';

const router = Router();

router.use('/thermometer', new ThermometerRoutes().router);

export default router;
