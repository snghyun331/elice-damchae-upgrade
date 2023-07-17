import { Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import MyPage from '../components/MyPage/MyPage';
import Story from '../components/Story/Story';
import LoginForm from '../components/User/Loginform';
import RegisterForm from '../components/User/Registerform';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="/login" element={<LoginForm />} />

			<Route path="/register" element={<RegisterForm />} />

			<Route path="/mypage" element={<MyPage />} />

			<Route path="/infochange" element={<MyPage />} />

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

		</Routes>
	);
};

export default Router;
