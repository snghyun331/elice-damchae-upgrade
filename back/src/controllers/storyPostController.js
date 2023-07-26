import { StoryPost } from '../db/schemas/storyPost.js';
import { StoryPostModel } from '../db/models/storyPostModel.js';
import { StoryPostService } from '../services/storyPostService.js';
import { imageService } from '../services/imageService.js';
import axios from 'axios';

const storyPostController = {
  createStoryPost: async (req, res, next) => {
    try {
      const { title, content, thumbnailStable, isPublic, mood, music } =
        req.body;
      const file = req.file;
      const thumbnailInfo = await imageService.uploadImage({ file });
      const userId = req.currentUserId;
      const userInfo = userId;
      const thumbnail = thumbnailInfo._id;
      const storyPostInfo = await StoryPostService.addStoryPost({
        userInfo,
        title,
        content,
        thumbnail,
        thumbnailStable,
        isPublic,
        mood,
        music,
      });
      const result = await StoryPost.populate(storyPostInfo, {
        path: 'userInfo thumbnail thumbnailStable',
      });
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  getPredict: async (req, res, next) => {
    try {
      const { content } = req.body;
      const pureContent = content.replace(/<[^>]+>/g, ' ');
      const obj = await axios.post('http://127.0.0.1:5000/predict', {
        text: pureContent,
      });
      // obj.data = { mood: '슬픔' }
      const Mood = obj.data.mood;

      // 비동기 함수
      const handlePhraseData = async (documents) => {
        let data = documents.filter((x) => x.mood === Mood);
        let Phrases = data.map((item) => item.phrase);
        let randomIndex = Math.floor(Math.random() * Phrases.length);
        let Phrase = Phrases[randomIndex];
        return Phrase;
      };

      const handleMusicData = async (documents) => {
        let data = documents.filter((x) => x.mood === Mood);
        let Musics = data.map((item) => item.music);
        let randomIndex = Math.floor(Math.random() * Musics.length);
        let Music = Musics[randomIndex];
        return Music;
      };

      const phrasePromise =
        StoryPostModel.getPhraseData().then(handlePhraseData);
      const musicPromise = StoryPostModel.getMusicData().then(handleMusicData);

      // phrasePromise와 musicPromise를 한번에 처리
      Promise.all([phrasePromise, musicPromise])
        .then(([Phrase, Music]) => {
          const formattedMusic = Music.slice(32);
          const result = { mood: Mood, phrase: Phrase, music: formattedMusic };
          return res.status(200).json(result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      next(error);
    }
  },

  updateStoryPost: async (req, res, next) => {
    try {
      const storyId = req.params.storyId;
      const { title, content, thumbnailStable, isPublic, mood, music } =
        req.body;
      const file = req.file ?? null;
      const userId = req.currentUserId;
      const userInfo = userId;
      let thumbnail;

      if (file) {
        const thumbnailInfo = await imageService.uploadImage({ file });
        thumbnail = thumbnailInfo._id;
        thumbnailStable === null;
      }

      if (thumbnailStable) {
        thumbnail === null;
      }

      const toUpdate = {
        title,
        content,
        thumbnail,
        thumbnailStable,
        isPublic,
        mood,
        music,
      };
      const updatedStory = await StoryPostService.setStory({
        userInfo,
        storyId,
        toUpdate,
      });
      const result = await StoryPost.populate(updatedStory, {
        path: 'userInfo thumbnail thumbnailStable',
      });
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  deleteStoryPost: async (req, res, next) => {
    try {
      const storyId = req.params.storyId;
      const result = await StoryPostService.deleteStory({ storyId });
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },

  readStoryDetail: async function (req, res, next) {
    try {
      const storyId = req.params.storyId;
      const storyInfo = await StoryPostService.readStoryDetail({ storyId });
      if (storyInfo.errorMessage) {
        throw new Error(storyInfo.errorMessage);
      }
      return res.status(200).send(storyInfo);
    } catch (error) {
      next(error);
    }
  },
};

export { storyPostController };
