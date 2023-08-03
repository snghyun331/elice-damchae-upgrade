import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { userAuthRouter } from './routers/userRouter.js';
import { userServiceRouter } from './routers/userServiceRouter.js';
import { storyPostRouter } from './routers/storyPostRouter.js';
import forestRouter from './routers/forestPostRouter.js';
import { imageRouter } from './routers/imageRouter.js';
import { storyCommentRouter } from './routers/storyCommentRouter.js';
import { forestLikeDislikeRouter } from './routers/forestLikeDislikeRouter.js';
// import { forestCommentRouter } from './routers/forestCommentRouter.js';

const app = express();
app.use('/uploads', express.static('uploads'));

app.use(
  cors({
    origin: process.env.FE_URL,
    credentials: true,
  }),
);

app.use(morgan('dev'));
// 콘솔창에서 log 확인

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요, 레이서 프로젝트 API 입니다.');
});

app.use(userAuthRouter);
app.use(userServiceRouter);
app.use(storyPostRouter);
app.use('/forest', forestRouter);
app.use(imageRouter);
app.use(storyCommentRouter);
app.use(forestLikeDislikeRouter);
// app.use(forestCommentRouter);
app.use(errorMiddleware);

export { app };
