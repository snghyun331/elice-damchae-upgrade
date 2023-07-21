import User from '../db/models/userModel.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

class userService {
	static async addUser({ email, password, mbti, nickname }) {
		// 이메일 중복 확인
		const user = await User.findByEmail({ email });
		if (user) {
			const errorMessage =
				'이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
			return { errorMessage };
		}

		// 비밀번호 해쉬화
		const hashedPassword = await bcrypt.hash(password, 10);

		// id 는 유니크 값 부여
		const newUser = {
			email,
			password: hashedPassword,
			mbti,
			nickname,
		};

		// db에 저장
		const createdNewUser = await User.create({ newUser });
		createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

		return createdNewUser;
	}

	static async getUser({ email, password }) {
		// 이메일 db에 존재 여부 확인
		const user = await User.findByEmail({ email });
		if (!user) {
			const errorMessage =
				'해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
			return { errorMessage };
		}

		// 비밀번호 일치 여부 확인
		const correctPasswordHash = user.password;
		const isPasswordCorrect = await bcrypt.compare(
			password,
			correctPasswordHash,
		);
		if (!isPasswordCorrect) {
			const errorMessage =
				'비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
			return { errorMessage };
		}

		// 로그인 성공 -> JWT 웹 토큰 생성
		const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
		const token = jwt.sign({ userId: user.id }, secretKey);

		// 반환할 loginuser 객체를 위한 변수 설정
		const id = user.id;
		const mbti = user.mbti;
		const nickname = user.nickname;
		const isOut = user.isOut;

		const loginUser = {
			token,
			id,
			email,
			mbti,
			nickname,
			isOut,
			errorMessage: null,
		};

		return loginUser;
	}

	static async getUsers() {
		const users = await User.findAll();
		return users;
	}

	static async setUser({ userId, toUpdate }) {
		let user = await User.findById(userId);

		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!user) {
			const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
			return { errorMessage };
		}

		if (toUpdate.nickname) {
			const fieldToUpdate = 'nickname';
			const newValue = toUpdate.nickname;
			user = await User.update({ userId, fieldToUpdate, newValue });
		}

		if (toUpdate.password) {
			const fieldToUpdate = 'password';
			const newValue = await bcrypt.hash(toUpdate.password, 10);
			user = await User.update({ userId, fieldToUpdate, newValue });
		}

		if (toUpdate.mbti) {
			const fieldToUpdate = 'mbti';
			const newValue = toUpdate.mbti;
			user = await User.update({ userId, fieldToUpdate, newValue });
		}

		return user;
	}

	static async getUserInfo({ userId }) {
		const user = await User.findById({ userId });

		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!user) {
			const errorMessage =
				'해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
			return { errorMessage };
		}

		return user;
	}

	static async getUserNickname({ nickname }) {
		const user = await User.findByNickname({ nickname });

		if (!user) {
			const usableNickname = '사용 가능한 닉네임 입니다.';
			return { usableNickname };
		}
		const unusableNickname = '이미 사용 중인 닉네임 입니다.';
		return { unusableNickname };
	}

	// 회원탈퇴 : 회원 정보는 그대로 남아있음
	static async withdrawUser({ userId }) {
		const user = await User.withdraw({ userId, isOut: true });
		return user;
	}
}

export { userService };
