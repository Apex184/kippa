import { Router } from 'express';

import { userRoutes } from './user/routes';
import { courseRoutes } from './courses/routes';

const router = Router();
router.use(userRoutes);
router.use(courseRoutes);
export { router as appRoutes };