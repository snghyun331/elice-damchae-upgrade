import { useState } from 'react';
import Search from '../Global/Search';
import DaenamusCard from '../Global/DaenamusCard';

import { Link } from 'react-router-dom';

const DaenamusMain = () => {
	const [showStoryCreateModal, setShowStoryCreateModal] = useState(false);

	const handleButtonClick = () => {
		setShowStoryCreateModal(true);
	};

	const handleModalClose = () => {
		setShowStoryCreateModal(false);
	};

	return (
		<>
			<header>{/* Header 컴포넌트 */}</header>

			<div className="container mx-auto px-4">
				<div className="mt-8 mb-4">
					<Search />
				</div>

				<h2 className="text-3xl font-bold mb-4">대나무숲</h2>

				<h4 className="text-lg font-medium mb-4">
					다양한 주제의 토론에 참가하고 나와 같은 유형이나 나와 다른 유형이
					어떻게 반응하는지 알아보아요
				</h4>

				<div className="flex justify-between mb-4">
					<div>
						{/* 버튼 대신 Link 컴포넌트를 사용하여 새로운 글쓰기 페이지로 이동하는 링크 생성 */}
						<Link
							to="/daenamus/write"
							className="bg-blue-500 text-white px-4 py-2 rounded-md"
						>
							글쓰기
						</Link>
					</div>

					<ul className="flex space-x-4">
						<li>
							<button className="text-blue-500">전체글</button>
						</li>
						<li>
							<button className="text-blue-500">인기글</button>
						</li>
						<li>
							<button className="text-blue-500">enfp</button>
						</li>
						<li>
							<button className="text-blue-500">enfj</button>
						</li>
						<li>
							<button className="text-blue-500">entp</button>
						</li>
						<li>
							<button className="text-blue-500">entj</button>
						</li>
						<li>
							<button className="text-blue-500">estp</button>
						</li>
						<li>
							<button className="text-blue-500">estj</button>
						</li>
						<li>
							<button className="text-blue-500">esfp</button>
						</li>
						<li>
							<button className="text-blue-500">esfj</button>
						</li>
						<li>
							<button className="text-blue-500">infp</button>
						</li>
						<li>
							<button className="text-blue-500">infj</button>
						</li>
						<li>
							<button className="text-blue-500">intp</button>
						</li>
						<li>
							<button className="text-blue-500">intj</button>
						</li>
						<li>
							<button className="text-blue-500">istp</button>
						</li>
						<li>
							<button className="text-blue-500">istj</button>
						</li>
						<li>
							<button className="text-blue-500">isfp</button>
						</li>
						<li>
							<button className="text-blue-500">isfj</button>
						</li>
					</ul>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{/* 게시글 카드를 데이터에 맞게 반복해서 생성 */}
					{Array.from({ length: 12 }).map((_, index) => (
						<div key={index}>
							<DaenamusCard />
						</div>
					))}
				</div>

				<div className="mt-8 flex justify-center">{/* 페이지네이션 */}</div>
			</div>
		</>
	);
};

export default DaenamusMain;
