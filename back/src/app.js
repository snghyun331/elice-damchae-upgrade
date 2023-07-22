import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { userRouter } from './routers/userRouter.js';
import { storyPostRouter } from './routers/storyPostRouter.js';
import forestRouter from './routers/forestPostRouter.js';

const app = express();

app.use(cors());
app.use(morgan('dev')); // 콘솔창에서 log 확인

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get('/', (req, res) => {
	res.send('안녕하세요, 레이서 프로젝트 API 입니다.');
});

app.use(userRouter);
app.use(storyPostRouter);
app.use('/post', forestRouter);
app.use(errorMiddleware);
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

export { app };
