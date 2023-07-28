import { useState } from 'react';
import Search from '../Global/Search';
import DaenamusCard from '../Global/DaenamusCard';
import { mbtiList } from '../Util/Util';
import { Link } from 'react-router-dom';

const DaenamusMain = () => {
	const [showStoryCreateModal, setShowStoryCreateModal] = useState(false);
	const [selectedMBTI, setSelectedMBTI] = useState([]);
	console.log(selectedMBTI)
	const handleButtonClick = () => {
		setShowStoryCreateModal(true);
	};

	const handleModalClose = () => {
		setShowStoryCreateModal(false);
	};

	const toggleMBTI = (value) => {
		if (selectedMBTI.includes(value)) {
			setSelectedMBTI(selectedMBTI.filter((item) => item !== value));
		} else {
			setSelectedMBTI([...selectedMBTI, value]);
		}
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
						<Link
							to="/daenamus/write"
							className="bg-blue-500 text-white px-4 py-2 rounded-md"
						>
							글쓰기
						</Link>
					</div>
				</div>

				<ul className="">
					{mbtiList.map((item, index) => {
						const isSelected = selectedMBTI.includes(item.value);

						return (
							<span
								key={index}
								onClick={() => toggleMBTI(item.value)}
								className={`cursor-pointer border pt-1 bg-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${
									isSelected ? 'border-blue-600 text-blue-600' : 'border-gray-400 text-gray-400'
								} dark:bg-white ${
									isSelected ? 'dark:text-blue-300' : 'dark:text-gray-400'
								}`}
							>
								{item.label} {isSelected && <span>×</span>}
							</span> 
						);
					})}
				</ul>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
