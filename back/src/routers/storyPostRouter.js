import { Router } from 'express';
import multer from 'multer';
import { loginRequired } from '../middlewares/loginRequired.js';
import { storyPostController } from '../controllers/storyPostController.js';
import { fileSize } from '../utills/constant.js';
import { imageService } from '../services/imageService.js';
import { UPLOAD_PATH } from '../constants.js/path.js';
import * as url from 'url';
import path from 'path';

const storyPostRouter = Router();

const upload = multer({
  storage: multer.diskStorage({
    async filename(req, file, done) {
      try {
        const uniqueFileName = await imageService.generateUniqueFileName(file);
        done(null, uniqueFileName);
      } catch (error) {
        done(null, error);
      }
    },

    destination(req, file, done) {
      const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
      const destinationPath = path.join(__dirname, `../../${UPLOAD_PATH}`);
      done(null, destinationPath);
    },
  }),
  fileFilter(req, file, done) {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/bmp',
      'image/gif',
      'image/jpg',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }
    done(null, true);
  },
  limits: { fileSize: fileSize },
});

storyPostRouter.post(
  '/stories',
  loginRequired,
  upload.single('thumbnail'),
  storyPostController.createStoryPost,
);

storyPostRouter.post(
  '/stories/recommend',
  loginRequired,
  storyPostController.getPredict,
);

// storyPostRouter.patch(
//   '/stories/:storyId',
//   loginRequired,
//   upload.single('thumbnail'),
//   storyPostController.updateStoryPost,
// );

storyPostRouter.delete(
  '/stories/:storyId',
  loginRequired,
  storyPostController.deleteStoryPost,
);

storyPostRouter.get('/stories/:storyId', storyPostController.readStoryDetail);

storyPostRouter.get('/stories', storyPostController.readAllStories);

export { storyPostRouter };
