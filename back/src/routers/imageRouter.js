import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { imageController } from '../controllers/imageController.js';
// import { upload } from '../utills/multer.js';
import { uploadS3 } from '../utills/multer.js';

const imageRouter = Router();

imageRouter.post(
  '/image/upload',
  loginRequired,
  uploadS3.single('image'),
  imageController.createImageSingle,
);

imageRouter.post(
  '/image/stable',
  loginRequired,
  imageController.createStableImage,
);

export { imageRouter };
