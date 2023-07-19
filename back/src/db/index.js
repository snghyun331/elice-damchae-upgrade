// mongo 연결

import mongoose from 'mongoose';

const DB_URL =
	process.env.MONGODB_URL ||
	'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.';

const db = mongoose.connection;

db.on('connected', () =>
	console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL),
);
db.on('error', (error) =>
	console.error('MongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error),
);

// import mongoose from 'mongoose';

// const DB_URL =
// process.env.MONGODB_URL ||
// 	mongoose.connect(DB_URL, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	});
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
// db.once('open', () => {
// 	console.log('MongoDB 서버에 연결되었습니다.');
// 	// 서버 시작 등의 추가 작업 수행 가능
// });