import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerCarousel from './BannerCarousel';
import Search from '../Global/Search';
import StoryCardMap from '../Global/StoryCardMap';
import useUserStore, { useUserState } from '../../store/useUserStore';

import ModalPortal from '../Stories/ModalPortal';
import useStoryStore from '../../store/useStoryStore';

import AOS from 'aos';
import 'aos/dist/aos.css';

import HomeMusicVideo from './HomeMusicVideo';

const Home = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
	});
	const { nickname } = useUserStore();
	const navigate = useNavigate();
	const isLoggedIn = useUserState();

	const { reset } = useStoryStore();

	const [storyModal, setStoryModal] = useState(false);

	const messages = [
		'행복한 하루 보내세요.',
		'미소 넘치는 하루 되세요.',
		'즐거운 순간이 가득하길 바라요.',
		'사랑 가득한 하루 되세요.',
		'기분 좋은 하루 되세요.',
		'희망찬 하루가 되길 바라요.',
		'오늘은 기쁜 일이 생길거에요.',
		'산뜻한 하루 되세요.',
		'빛나는 당신을 응원합니다.',
	];
	const randomMessage = messages[Math.floor(Math.random() * messages.length)];

	const onClose = () => {
		setStoryModal(false);
		reset();
	};

	const messageDiv = (
		<>
			<span className="text-2xl">
				{nickname ? nickname + ' 님, ' : ''}
				{randomMessage}
			</span>
			<br />
			<div className="mb-10">
				<button
					onClick={
						isLoggedIn ? () => navigate('/stories') : () => navigate('/login')
					}
					type="button"
					className="w-36 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
				>
					내 스토리
				</button>
				<button
					onClick={
						isLoggedIn
							? () => {
									setStoryModal(true);
							  }
							: () => navigate('/login')
					}
					type="button"
					className="w-36 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
				>
					스토리 쓰기
				</button>
			</div>
		</>
	);

	return (
		<div>
			<div className="z-50">
				<div className="space-y-5">
					{/* <div className="px-3 border-t border-gray-200 dark:border-gray-600">
						<HomeMusicVideo music={'FAMKcwTBh7Q'} />
					</div> */}
					<BannerCarousel />

					<div
						data-aos="zoom-in"
						className="p-6 md:p-10 mt-16 mb-16 flex justify-center items-center flex-col"
					>
						{messageDiv}
					</div>
				</div>

				<hr className="mt-10" />

				<div className="mx-4 sm:mx-10 md:mx-20 lg:mx-40" data-aos="fade-right">
					<div className="mt-10 text-3xl font-semibold">우리들의 스토리</div>
					<div className="mt-20 items-center">
						<Search />
					</div>
					<StoryCardMap endpoint="stories" />
				</div>
			</div>
			<div>
				<ModalPortal storyModal={storyModal} onClose={onClose} />
			</div>
		</div>
	);
};

export default Home;
