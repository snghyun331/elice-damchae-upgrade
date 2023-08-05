import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useIsLoggedIn, useUserActions } from '@/store/useUserStore';
import { classNames } from '../../Util/Util';
import { Bars3Icon } from '@heroicons/react/24/solid';
const MobileHeader = () => {
	const navigate = useNavigate();
	const isLoggedIn = useIsLoggedIn();

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
		  ];

	return (
		<Menu as="div" className="relative inline-block text-left md:hidden">
			<div>
				<Menu.Button className="inline-flex px-4 py-3 text-sm md:hidden">
					<Bars3Icon className="h-8 text-white" />
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
				<Menu.Items className="text-center absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						{mobMenuItems.map((item) => (
							<Menu.Item key={item.title}>
								{({ active }) => (
									<a
										onClick={item.onClick}
										className={classNames(
											active ? 'bg-gray-100 text-blue-900' : 'text-gray-700',
											'cursor-pointer block px-4 py-2',
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
