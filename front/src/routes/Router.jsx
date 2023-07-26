import { Route, Routes, Outlet } from 'react-router-dom';
import Home from '../components/Home/Home';
import MyPage from '../components/MyPage/MyPage';
import InfoChange from '../components/User/InfoChange';
import MyStories from '../components/Stories/MyStories';
import LoginForm from '../components/User/Loginform';
import RegisterForm from '../components/User/Registerform';
import StoryRead from '../components/Stories/StoryRead';

const MainLayout = () => {
	return <div className='main-container'><Outlet /></div>
}

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />

				<Route path="login" element={<LoginForm />} />

				<Route path="register" element={<RegisterForm />} />

				<Route path="mypage" element={<MyPage />} />

				<Route path="infochange" element={<InfoChange />} />

				<Route path="stories" element={<Outlet />}>
					<Route index element={<MyStories />} />
					<Route path="read" element={<StoryRead />} />
					<Route path=":storyId" element={<StoryRead />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default Router;
