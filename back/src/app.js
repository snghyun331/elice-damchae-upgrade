import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();
app.use(express.json());

// 기본 페이지
app.get('/', (req, res) => {
	res.send('안녕하세요, 레이서 프로젝트 API 입니다.');
});

app.post('/user/login', async (req, res) => {
	const { id, password } = req.body;
	// TODO id, password가 있는지 체크한다.
	try {
		// 입력받은 id의 사용자를 찾는다.
		const user = await User.findOne({ id });
		if (!user) {
			res.status(400).send({ message: '존재하지 않는 사용자입니다.' });
			return;
		}

		// 입력받은 password와 찾은 사용자의 password가 일치하는지 체크한다.
		if (user.password !== password) {
			res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
			return;
		}

		// 토큰을 발급한다.
		res.status(200).send({ token: tokenService.getToken(id) });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: '로그인에 실패했습니다.' });
	}
});

export { app };
// <<<<<<< HEAD
// import cors from 'cors';
// import express from 'express';
// import { errorMiddleware } from './middlewares/errorMiddleware.js';
// =======
// import express from 'express';
// import { tokenService } from './services/tokenService.js';
// import userRouter from './routers/forestPostRouter.js';
// import forestPostRouter from './routers/forestPostRouter.js';
// import User from './db/schemas/user.js';
// // 사용자 정보를 담을 배열
// >>>>>>> forest

// const app = express();
// app.use(express.json());

// <<<<<<< HEAD
// // 기본 페이지
// app.get('/', (req, res) => {
// 	res.send('안녕하세요, 레이서 프로젝트 API 입니다.');
// =======
// app.use('/user', userRouter);
// // app.use('/post', postRouter);
// app.use('/post', forestPostRouter);
// // 회원가입
// app.post('/user/register', async (req, res) => {
// 	const { id, password, name } = req.body;

// 	try {
// 		// 아이디 중복 체크
// 		const existingUser = await User.findOne({ id });
// 		if (existingUser) {
// 			res.status(400).send({ message: '이미 존재하는 아이디입니다.' });
// 			return;
// 		}

// 		// 사용자 생성 및 저장
// 		const user = new User({ id, password, name });
// 		await user.save();
// 		res.send({ message: '사용자를 등록했습니다.' });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).send({ message: '사용자 등록에 실패했습니다.' });
// 	}
// >>>>>>> forest
// });

// app.post('/user/login', async (req, res) => {
// 	const { id, password } = req.body;
// 	// TODO id, password가 있는지 체크한다.
// 	try {
// 		// 입력받은 id의 사용자를 찾는다.
// 		const user = await User.findOne({ id });
// 		if (!user) {
// 			res.status(400).send({ message: '존재하지 않는 사용자입니다.' });
// 			return;
// 		}

// 		// 입력받은 password와 찾은 사용자의 password가 일치하는지 체크한다.
// 		if (user.password !== password) {
// 			res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' });
// 			return;
// 		}

// 		// 토큰을 발급한다.
// 		res.status(200).send({ token: tokenService.getToken(id) });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).send({ message: '로그인에 실패했습니다.' });
// 	}
// });

// export { app };
