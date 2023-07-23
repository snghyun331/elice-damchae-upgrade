import { Router } from 'express';
import multer from 'multer';
import { loginRequired } from '../middlewares/loginRequired.js';
import { imageController } from '../controllers/imageController.js';

const imageRouter = Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
});

imageRouter.post(
  '/images/single/upload',
  loginRequired,
  upload.single('image'),
);

imageRouter.post('/images/multi/upload', loginRequired, upload.array('image'));

export { imageRouter };
