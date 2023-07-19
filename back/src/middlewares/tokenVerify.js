import { tokenService } from '../jwt';

const tokenVerify = (req, res, next) => {
	// Request headers에 토큰이 없으면 오류를 반환한다.
	if (!req.headers.authorization) {
		res.status(400).send({ message: '토큰이 존재하지 않습니다.' });
		return;
	}

	try {
		const payload = tokenService.getPayload(req.headers.authorization);
		// request 객체에 사용자 아이디를 저장한다.
		req.user_id = payload.user_id;
	} catch (error) {
		// 토큰 payload를 얻는데 실패하면 유효한 토큰이므로 client에 알려준다.
		res.status(400).send({ message: '유효하지 않은 토큰입니다.' });
		return;
	}

	next();
};

export { tokenVerify };
