import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import MyPage from '../components/MyPage/MyPage';
import InfoChange from '../components/User/InfoChange';
import MyStories from '../components/MyStories/MyStories';
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

			<Route path="/stories" element={<MyStories />}>
				<Route path=":index" element={<MyStories />} />
				<Route path=":storyId" element={<MyStories />} />
				<Route path="write" element={<MyStories />} />
			</Route>

			{/* <Route path="/daenamus" element={<Stories />}>
				<Route path=":index" element={<Stories />} />
				<Route path=":daenamuId" element={<Stories />} />
				<Route path="write" element={<Stories />} />
			</Route> */}
		</Routes>
	);
};

export default Router;
