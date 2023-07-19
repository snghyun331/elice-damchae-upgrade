import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ');
};

const Header = () => {
	const [isLoggedIn, setisLoggedIn] = useState('true');
	const navigate = useNavigate();
	const logout = () => {
		setisLoggedIn(false);
	};

	const menuItems = [
		{ title: '마이 페이지', onClick: () => navigate('/mypage') },
		{ title: '회원정보 수정', onClick: () => navigate('/infochange') },
	];

	const mobMenuItems = [
		{ title: '대나무숲', onClick: () => navigate('/mypage') },
		{ title: '내 스토리', onClick: () => navigate('/stories') },
		{ title: '마이 페이지', onClick: () => navigate('/mypage') },
		{ title: '회원정보 수정', onClick: () => navigate('/infochange') },
		{ title: '로그아웃', onClick: () => logout() },
	];
	const mobMenuItemsGuest = [
		{ title: '대나무숲', onClick: () => navigate('/mypage') },
		{ title: '내 스토리', onClick: () => navigate('/stories') },
		{ title: '로그인', onClick: () => navigate('/login') },
	];
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
							<div className="flex justify-between"></div>
							<div className="flex items-center gap-2">
								<Menu as="div" className="relative inline-block text-left">
									<div>
										<Menu.Button
											className="whitespace-nowrap hidden md:block px-4 py-2 pt-3 text-center shadow-inner inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-200 px-3 py-2 text-lg font-semibold hover:bg-[#FFFAEE] shadow text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											style={{
												boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.1)',
											}}
										>
											<div className="flex flex-row">
												<UserCircleIcon
													className="-mr-1 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
											</div>
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
										<Menu.Items className="whitespace-nowrap absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 nav-item cursor-pointer focus:outline-none">
											<div className="py-1">
												{menuItems.map((item, index) => (
													<Menu.Item key={index}>
														{({ active }) => (
															<a
																onClick={item.onClick}
																className={classNames(
																	active
																		? 'bg-gray-100 text-blue-900'
																		: 'text-gray-700',
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
								<button
									onClick={() => logout()}
									type="button"
									className="whitespace-nowrap hidden md:block text-white shadow-inner bg-[#A06763] hover:bg-[#A36560] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-4 py-2 pt-3 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
									style={{
										boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.1)',
									}}
								>
									로그아웃
								</button>
							</div>
						</>
					) : (
						<button
							onClick={() => navigate('/login')}
							type="button"
							className="whitespace-nowrap hidden md:block text-white shadow-inner bg-blue-500 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-[#9BB1BB] font-medium rounded-lg text-lg px-4 py-2 pt-3 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							style={{
								boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.1)',
							}}
						>
							로그인
						</button>
					)}

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
									{(isLoggedIn ? mobMenuItems : mobMenuItemsGuest).map(
										(item) => (
											<Menu.Item key={item.title}>
												{({ active }) => (
													<a
														onClick={item.onClick}
														className={classNames(
															active
																? 'bg-gray-100 text-blue-900'
																: 'text-gray-700',
															'block px-4 py-2 text-lg',
														)}
													>
														{item.title}
													</a>
												)}
											</Menu.Item>
										),
									)}
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-sticky"
				>
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<a
								href="#"
								className="text-white block py-2 pl-3 pr-4 mr-5 text-gray-900 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								대나무숲
							</a>
						</li>
						<li>
							<Link
								to="/stories"
								className="text-white block py-2 pl-3 pr-4 ml-5 text-gray-900 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
							>
								내 스토리
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
