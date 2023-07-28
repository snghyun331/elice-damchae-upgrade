import { imageService } from '../services/imageService.js';
import { ImageModel } from '../db/models/imageModel.js';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
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
      const userId = req.currentUserId;
      const { content } = req.body;
      const pureContent = content.replace(/<[^>]+>/g, ' ');
      const result = await axios.post('http://127.0.0.1:5002/generate-image', {
        korean_text: pureContent,
      });
      // console.log(result.data.image_base64);
      const image_data = Buffer.from(result.data.image_base64, 'base64');
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileName = `image-${uniqueSuffix}.png`;
      const filePath = `uploads/${fileName}`;
      fs.writeFileSync(filePath, image_data);
      const resizedImagePath = `uploads/resized-${fileName}`;
      const resizedFileName = `resized-${fileName}`;
      const resizedImageBuffer = await sharp(filePath).toBuffer();
      await sharp(resizedImageBuffer).toFile(resizedImagePath);

      // 원본 이미지 삭제
      fs.unlinkSync(filePath); // 이미지 리사이징 완료되면 원본은 삭제
      const fullResizedImagePath = path.resolve(resizedImagePath);
      const newImage = {
        fileName: resizedFileName,
        path: fullResizedImagePath,
      };
      const createImage = await ImageModel.create({ newImage });
      res.status(201).json(createImage);
    } catch (error) {
      next(error);
    }
  }
}

export { imageController };
