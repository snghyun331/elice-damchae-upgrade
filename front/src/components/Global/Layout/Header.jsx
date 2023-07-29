import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import useUserStore from '../../../store/useUserStore';
import MobileHeader from './MobileHeader';
import ProfileButton from './ProfileButton';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Header = () => {
	const navigate = useNavigate();
	const { isLoggedIn } = useUserStore();

	const handleGuestClick = () => {
		if (isLoggedIn) {
			navigate('/stories');
		} else {
			navigate('/login');
		}
	};

	return (
		<nav className="bg-blue-400 border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					to="/"
					className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white"
				>
					Damchae
				</Link>

				<div className="flex justify-end md:order-2 gap-1">
					{isLoggedIn ? (
						<>
							<div className="flex justify-between">
								<div className="flex items-center gap-2">
									<ProfileButton />
									<LogoutButton />
								</div>
							</div>
						</>
					) : (
						<LoginButton />
					)}
					<MobileHeader />
				</div>
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-sticky"
				>
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<button
								onClick={() => {
									navigate('/daenamus');
								}}
								className="text-white block py-2 pl-3 pr-4 mr-5 text-gray-900 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								대나무숲
							</button>
						</li>
						<li>
							<button
								onClick={handleGuestClick}
								className="text-white block py-2 pl-3 pr-4 ml-5 text-gray-900 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								내 스토리
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
