import is from '@sindresorhus/is';
import { userService } from '../services/userService.js';

class userAuthController {
  static async userRegister(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      // req (request) 에서 데이터 가져오기
      const { email, password, nickname, mbti, isGoogleLogin } = await req.body;
      // 위 데이터를 유저 db에 추가하기
      const newUser = await userService.createUser({
        email,
        password,
        nickname,
        mbti,
        isGoogleLogin,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      res
        .status(400)
        .send({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const email = req.body.email;
      const password = req.body.password;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userService.readUser({ email, password });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  static async userUpdate(req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const userId = req.params.userId;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const password = req.body.password ?? null;
      const nickname = req.body.nickname ?? null;
      const mbti = req.body.mbti ?? null;

      const toUpdate = { password, nickname, mbti };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userService.updateUser({ userId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async checkNickname(req, res, next) {
    try {
      const nickname = req.query.nickname.replace(/\/$/, '');
      const existingUser = await userService.readUserNickname({ nickname });

      return res.json(existingUser);
    } catch (error) {
      res.status(500).json();
    }
  }

  static async userDelete(req, res, next) {
    try {
      const userId = req.body.userId;
      // 사용자를 비활성화 처리하기 위해 `isOut` 필드를 `true`로 설정
      const user = await userService.deleteUser({ userId });

      if (!user) {
        return res.status(404).json({ error: '존재하지 않는 유저입니다.' });
      }
      return res.status(200).json({ message: '회원 탈퇴 완료' });
    } catch (error) {
      next(error);
    }
  }
}

export { userAuthController };
