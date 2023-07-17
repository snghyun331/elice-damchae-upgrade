import { Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import MyPage from '../components/MyPage/MyPage';
import Story from '../components/Story/Story';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="/mypage" element={<MyPage />} />

			<Route path="/stories" element={<Story />}>
				<Route path=":index" element={<Story />} />
				<Route path=":storyId" element={<Story />} />
				<Route path="write" element={<Story />} />
			</Route>

			<Route path="/daenamus" element={<Story />}>
				<Route path=":index" element={<Story />} />
				<Route path=":daenamuId" element={<Story />} />
				<Route path="write" element={<Story />} />
			</Route>

			<Route path="/infochange" element={<MyPage />} />
		</Routes>
	);
};

export default Router;
