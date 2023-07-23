import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { imageController } from '../controllers/imageController.js';

const imageRouter = Router();

imageRouter.post('/images/single/upload', loginRequired);

imageRouter.post('/images/multi/upload', loginRequired);
