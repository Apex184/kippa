import { Router } from 'express';
import { createUserController } from './controllers';
import { validate } from '@/lib/middlewares';
import { CreateUserSchema } from './validation';

const router = Router();

router.post('/user', validate(CreateUserSchema), createUserController);

export const userRoutes = router;