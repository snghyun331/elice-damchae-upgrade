import { StoryPostModel } from '../db/models/storyPostModel.js';
import { StoryPostService } from '../services/storyPostService.js';
import { imageService } from '../services/imageService.js';
import axios from 'axios';

class storyPostController {
  static async createStoryPost(req, res, next) {
    try {
      const userId = req.currentUserId;
      const userInfo = userId;

      const { title, content, thumbnail, isPublic, mood, music, views } =
        req.body;
      const file = req.file ?? null;
      let thumbnailLocal;
      let thumbnailLocalId;
      let storyPostInfo;
      if (file && !thumbnail) {
        thumbnailLocal = await imageService.uploadImage({ file });
        thumbnailLocalId = thumbnailLocal._id;
        storyPostInfo = await StoryPostService.createStoryPost({
          userInfo,
          title,
          content,
          thumbnail: thumbnailLocalId,
          isPublic,
          mood,
          music,
          views,
        });
      } else if (!file && thumbnail) {
        storyPostInfo = await StoryPostService.createStoryPost({
          userInfo,
          title,
          content,
          thumbnail: thumbnail,
          isPublic,
          mood,
          music,
          views,
        });
      } else if (!file && !thumbnail) {
        storyPostInfo = await StoryPostService.createStoryPost({
          userInfo,
          title,
          content,
          thumbnail: null,
          isPublic,
          mood,
          music,
          views,
        });
      }

      const result = await StoryPostService.populateStoryPost(
        storyPostInfo,
        'userInfo thumbnail',
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getPredict(req, res, next) {
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
          return res.status(201).json(result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      next(error);
    }
  }

  static async updateStoryPost(req, res, next) {
    try {
      const storyId = req.params.storyId;
      const { title, content, thumbnail, isPublic, mood, music } = req.body;
      const file = req.file ?? null;
      const userId = req.currentUserId;
      const isSameUser = await StoryPostService.isSameUser(userId, storyId);
      if (!isSameUser) {
        throw new Error('스토리 수정 권한이 없습니다.');
      }

      let thumbnailLocal;
      let thumbnailLocalId;
      let toUpdate;
      if (file && !thumbnail) {
        thumbnailLocal = await imageService.uploadImage({ file });
        thumbnailLocalId = thumbnailLocal._id;
        toUpdate = {
          title,
          content,
          thumbnail: thumbnailLocalId,
          isPublic,
          mood,
          music,
        };
      } else if (!file && thumbnail) {
        toUpdate = {
          title,
          content,
          thumbnail,
          isPublic,
          mood,
          music,
        };
      } else if (!file && !thumbnail) {
        toUpdate = {
          title,
          content,
          thumbnail: null,
          isPublic,
          mood,
          music,
        };
      }

      const updatedStory = await StoryPostService.setStory({
        storyId,
        toUpdate,
      });

      const result = await StoryPostService.populateStoryPost(
        updatedStory,
        'userInfo thumbnail',
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteStoryPost(req, res, next) {
    try {
      const storyId = req.params.storyId;
      const loginUserId = req.currentUserId;
      const isSameUser = await StoryPostService.isSameUser(
        loginUserId,
        storyId,
      );
      if (!isSameUser) {
        throw new Error('스토리 삭제 권한이 없습니다.');
      }
      const result = await StoryPostService.deleteStory({ storyId });
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  static async readStoryDetail(req, res, next) {
    try {
      const storyId = req.params.storyId;
      const storyInfo = await StoryPostService.readStoryDetail({ storyId });
      if (!storyInfo) {
        throw new Error('스토리를 찾을 수 없습니다');
      }

      const result = await StoryPostService.populateStoryPost(
        storyInfo,
        'userInfo thumbnail',
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async readAllStories(req, res, next) {
    try {
      const page = parseInt(req.query.page || 1); // default 페이지: 1
      const limit = 8; // 한페이지에 들어갈 스토리 수

      const { option, searchword } = req.query;
      let searchQuery = {};
      let result;
      // 제목만 검색
      if (option === 'title') {
        searchQuery = { title: new RegExp(searchword, 'i') };
        const { stories, totalPage, count } =
          await StoryPostService.readSeachQueryPosts(limit, page, searchQuery);
        const populateResult = await StoryPostService.populateStoryPost(
          stories,
          'userInfo thumbnail',
        );

        if (populateResult.length === 0) {
          throw new Error('검색 결과가 없습니다');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalStoriesCount: count,
          stories: populateResult,
        };
        // 내용만 검색
      } else if (option === 'content') {
        searchQuery = { content: new RegExp(searchword, 'i') };
        const { stories, totalPage, count } =
          await StoryPostService.readSeachQueryPosts(limit, page, searchQuery);
        const populateResult = await StoryPostService.populateStoryPost(
          stories,
          'userInfo thumbnail',
        );

        if (populateResult.length === 0) {
          throw new Error('검색 결과가 없습니다');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalStoriesCount: count,
          stories: populateResult,
        };
        // 제목 + 내용 검색
      } else if (option === 'title_content') {
        searchQuery = {
          $or: [
            { title: new RegExp(searchword, 'i') },
            { content: new RegExp(searchword, 'i') },
          ],
        };
        const { stories, totalPage, count } =
          await StoryPostService.readSeachQueryPosts(limit, page, searchQuery);
        const populateResult = await StoryPostService.populateStoryPost(
          stories,
          'userInfo thumbnail',
        );

        if (populateResult.length === 0) {
          throw new Error('검색 결과가 없습니다');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalStoriesCount: count,
          stories: populateResult,
        };
        // 모든 스토리 검색
      } else {
        const { stories, totalPage, count } = await StoryPostService.readPosts(
          limit,
          page,
        );
        const populateResult = await StoryPostService.populateStoryPost(
          stories,
          'userInfo thumbnail',
        );

        if (populateResult.length === 0) {
          throw new Error('스토리가 없습니다');
        }

        result = {
          currentPage: page,
          totalPage: totalPage,
          totalStoriesCount: count,
          stories: populateResult,
        };
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { storyPostController };
