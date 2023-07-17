import { Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import MyPage from '../components/MyPage/MyPage';
import Story from '../components/Story/Story';

const Router = () => {
	return (
		<Routes>
            
			<Route path="/" element={<Home />} />

			<Route path="/mypage" element={<MyPage />} />

			<Route path="/stories" element={<Story />} />
                <Route path="/stories/:index" element={<Story />} />
                <Route path="/stories/:storyId" element={<Story />} />
                <Route path="/stories/write" element={<Story />} />

			<Route path="/daenamus" element={<Story />} />
                <Route path="/daenamus/:index" element={<Story />} />
                <Route path="/daenamus/:daenamuId" element={<Story />} />
                <Route path="/daenamus/write" element={<Story />} />

			<Route path="/infochange" element={<MyPage />} />

		</Routes>
	);
};

export default Router;
