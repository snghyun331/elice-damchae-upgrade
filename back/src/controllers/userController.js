import is from '@sindresorhus/is';
import { userService } from '../services/userService.js';
import { OAuth2Client } from 'google-auth-library';
import smtpTransport from '../utills/emailAuth.js';
import { imageService } from '../services/imageService.js';

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
    } catch (err) {
      res
        .status(400)
        .send({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
    }
  }

  //구글 가입용
  static async googleRegister(req, res, next) {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID); // CLIENT_ID를 애플리케이션의 Google CLIENT_ID로 대체하세요.

    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      const { email, idToken, nickname, mbti, isGoogleLogin } = await req.body;

      // Google ID 토큰을 검증합니다.
      const verifyIdToken = async (token) => {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return payload;
      };

      const payload = await verifyIdToken(idToken);
      if (!payload || payload.email !== email) {
        res.status(400).send({ errorMessage: 'Google 인증에 실패했습니다.' });
        return;
      }

      const newUser = await userService.createUser({
        email,
        password: null,
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
      if (user.isGoogleLogin) {
        throw new Error('Google 로그인으로 진행하세요.');
      }

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  //구글 로그인용
  static async googleLogin(req, res, next) {
    try {
      const email = req.body.email;
      const idToken = req.body.idToken;

      const user = await userService.readGoogleUser({ email, idToken });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  // 이메일 인증
  static async sendAuthCode(req, res, next) {
    const email = req.body.email;
    const emailString = await userService.createAuthString();
    try {
      const mailOptions = {
        from: 'MBTI 커뮤니티',
        to: email,
        subject: '[MBTI 커뮤니티] 이메일 확인 인증코드 안내',
        text: `아래 코드를 인증코드란에 입력해주세요.\n
            인증코드 👉 ${emailString}\n
            인증코드는 3분 후에 만료됩니다.`,
      };

      smtpTransport.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).json({
            message: `${email}로 보내는 인증메일 전송에 실패하였습니다.`,
          });
        } else {
          res.status(200).json({
            message: `${email} 로 인증메일 전송에 성공했습니다.`,
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // 유저가 입력한 이메일 인증코드 확인
  static async validateString(req, res, next) {
    try {
      const string = req.body.string;
      const isVerified = await userService.readAuthString({ string });

      if (isVerified === null) {
        return res
          .status(400)
          .json({
            errorMessage: '잘못된 인증코드입니다. 다시 한 번 확인해주세요.',
          });
      } else if (isVerified === string) {
        return res
          .status(200)
          .json({ message: '이메일 인증에 성공하였습니다.' });
      }
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
      const file = req.file ?? null;

      const profileImg = await imageService.uploadImage({ file });
      const profileImgId = profileImg._id;

      const toUpdate = { password, nickname, mbti, profileImg: profileImgId };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userService.updateUser({ userId, toUpdate });

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

class userServiceController {
  static async userStories(req, res, next) {
    const userId = req.params.userId;
    const stories = await userService.readStories({ userId });

    return res.json(stories);
  }

  static async userForests(req, res, next) {
    try {
      const userId = req.params.userId;
      const forests = await userService.readForests({ userId });

      return res.json(forests);
    } catch (error) {
      res.status(500);
    }
  }
}

export { userAuthController, userServiceController };
