import { Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import MyPage from '../components/MyPage/MyPage';
import InfoChange from '../components/User/InfoChange';
import Stories from '../components/Story/Stories';
import LoginForm from '../components/User/Loginform';
import RegisterForm from '../components/User/Registerform';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />

			<Route path="/login" element={<LoginForm />} />

			<Route path="/register" element={<RegisterForm />} />

			<Route path="/mypage" element={<MyPage />} />

			<Route path="/infochange" element={<InfoChange />} />

			<Route path="/stories" element={<Stories />}>
				<Route path=":index" element={<Stories />} />
				<Route path=":storyId" element={<Stories />} />
				<Route path="write" element={<Stories />} />
			</Route>

			<Route path="/daenamus" element={<Stories />}>
				<Route path=":index" element={<Stories />} />
				<Route path=":daenamuId" element={<Stories />} />
				<Route path="write" element={<Stories />} />
			</Route>
		</Routes>
	);
};

export default Router;
