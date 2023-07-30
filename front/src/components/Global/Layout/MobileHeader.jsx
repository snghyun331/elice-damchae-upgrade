import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useUserActions, useUserState } from '../../../store/useUserStore';
import { classNames } from '../../Util/Util';

const MobileHeader = () => {
	const navigate = useNavigate();
	const isLoggedIn = useUserState();

	const { logout } = useUserActions();
	const mobMenuItems = isLoggedIn
		? [
				{ title: '대나무숲', onClick: () => navigate('/daenamus') },
				{ title: '내 스토리', onClick: () => navigate('/stories') },
				{ title: '마이 페이지', onClick: () => navigate('/mypage') },
				{ title: '회원정보 수정', onClick: () => navigate('/infochange') },
				{
					title: '로그아웃',
					onClick: () => {
						logout();
						navigate('/');
					},
				},
		  ]
		: [
				{ title: '대나무숲', onClick: () => navigate('/daenamus') },
				{ title: '내 스토리', onClick: () => navigate('/login') },
				{ title: '로그인', onClick: () => navigate('/login') },
		  ];

	return (
		<Menu as="div" className="relative inline-block text-left md:hidden">
			<div>
				<Menu.Button className="bg-white inline-flex px-4 py-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6 -mr-1 text-gray-400"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						{mobMenuItems.map((item) => (
							<Menu.Item key={item.title}>
								{({ active }) => (
									<a
										onClick={item.onClick}
										className={classNames(
											active ? 'bg-gray-100 text-blue-900' : 'text-gray-700',
											'block px-4 py-2 text-lg',
										)}
									>
										{item.title}
									</a>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
export default MobileHeader;
