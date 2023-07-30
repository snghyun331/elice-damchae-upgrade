import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { classNames } from '../../Util/Util';

const ProfileButton = () => {
	const navigate = useNavigate();
	const profileItems = [
		{ title: '마이 페이지', onClick: () => navigate('/mypage') },
		{ title: '회원정보 수정', onClick: () => navigate('/infochange') },
	];
	return (
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
						{profileItems.map((item, index) => (
							<Menu.Item key={index}>
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

export default ProfileButton;
