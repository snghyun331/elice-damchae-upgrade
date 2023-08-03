import { imageService } from '../services/imageService.js';
import axios from 'axios';

class imageController {
  static async createImageSingle(req, res, next) {
    try {
      const file = req.file;
      const createImage = await imageService.uploadImage({ file });
      res.status(201).json(createImage);
    } catch (error) {
      next(error);
    }
  }

  static async createStableImage(req, res, next) {
    try {
      const { content } = req.body;
      const pureContent = content.replace(/<[^>]+>/g, ' ');
      const result = await axios.post(
        process.env.STABLE_DIFFUSION_FLASK_SERVER_URL,
        {
          koreanText: pureContent,
        },
      );
      const imageData = Buffer.from(result.data.imageBase64, 'base64');
      const createImage = await imageService.uploadStableImage(imageData);

      res.status(201).json(createImage);
    } catch (error) {
      next(error);
    }
  }
}

export { imageController };
