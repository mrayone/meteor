import { Router } from 'express';
import UserController from '../controller/UserController';
import SessionController from '../controller/SessionController';
const router = Router();
const userController = new UserController();
const sessionController = new SessionController();

router.get('/users/:id', userController.show);
router.post('/users/', userController.store);
router.post('/sessions', sessionController.store);

export default router;
