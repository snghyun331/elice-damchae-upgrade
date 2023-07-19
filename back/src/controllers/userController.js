import BadRequest from '../middlewares/error/badRequest.js';
import { getById } from '../services/userService';
import { create, getById } from '../services/userService';
import tokenService from '../jwt';

// 회원가입
app.post('/user/register', async (req, res) => {
	const { id, password, name } = req.body;

	if (!id || !password || !name) {
		throw new BadRequest('id, password, name은 필수입력 사항입니다.');
	}

	const user = await getById(id);
	if (user) {
		throw new BadRequest('이미 존재하는 아이디입니다.');
	}

	await create({ id, password, name });

	res.send({ message: '사용자를 등록했습니다.' });
});
// 로그인
app.post('/user/login', async (req, res) => {
	const { id, password } = req.body;

	if (!id || !password) {
		throw new BadRequest('id, password는 필수입력 사항입니다.');
	}

	const user = await getById(id);
	if (!user || user.password !== password) {
		throw new BadRequest(
			'존재하지 않는 사용자이거나 비밀번호가 일치하지 않습니다.',
		);
	}

	res.status(200).send({ token: tokenService.getToken(id) });
});
