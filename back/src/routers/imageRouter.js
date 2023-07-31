import { Router } from 'express';
import multer from 'multer';
import { loginRequired } from '../middlewares/loginRequired.js';
import { imageController } from '../controllers/imageController.js';
import { fileSize } from '../utills/constant.js';

const imageRouter = Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: fileSize },
});

imageRouter.post(
  '/image/upload',
  loginRequired,
  upload.single('image'),
  imageController.createImageSingle,
);

imageRouter.post(
  '/image/stable',
  loginRequired,
  imageController.createStableImage,
);
// imageRouter.post('/images/upload', loginRequired, upload.array('image'));

export { imageRouter };
