import * as url from 'url';
import path from 'path';
import multer from 'multer';
import { fileSize } from './constant.js';
import { UPLOAD_PATH } from './path.js';
import { imageService } from '../services/imageService.js';

export const upload = multer({
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
