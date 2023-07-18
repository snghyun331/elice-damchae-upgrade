import mongoose from 'mongoose';

const DB_URL =
	process.env.MONGODB_URL ||
	mongoose.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
db.once('open', () => {
	console.log('MongoDB 서버에 연결되었습니다.');
	// 서버 시작 등의 추가 작업 수행 가능
});
