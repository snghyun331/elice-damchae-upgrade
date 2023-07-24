import { imageService } from '../services/imageService.js';

const imageController = {
  createImageSingle: async (req, res, next) => {
    try {
      const file = req.file;
      const createImage = await imageService.uploadImage({ file });
      res.status(201).send(createImage);
    } catch (error) {
      next(error);
    }
  },
};

export { imageController };
