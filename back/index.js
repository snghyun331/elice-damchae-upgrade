import 'dotenv/config';
import { app } from './src/app.js';



app.listen(PORT, () => {
	console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});

// });
// import 'dotenv/config';
// import { app } from './src/app.js';
// import mongoose from 'mongoose';

// const DB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/test_db';

// mongoose.connect(DB_URL, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB 연결 오류:'));
// db.once('open', () => {
// 	console.log('MongoDB 서버에 연결되었습니다.');

// 	// 데이터를 저장할 posts 변수 정의
// 	const posts = {
// 		data: [],
// 		id: 1,
// 	};

// 	// 글 정보를 담은 posts 객체를 app에 주입
// 	app.set('posts', posts);

// 	const PORT = process.env.SERVER_PORT || 3001;

// 	app.listen(PORT, () => {
// 		console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
// 	});

// });
