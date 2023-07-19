import { ChevronRightIcon } from '@heroicons/react/24/solid';

const MyDaenamus = () => {
	return (
		<>
			{' '}
			<h3 className="text-2xl text-gray-700 font-semibold">내가 쓴 대나무숲</h3>
			<div className="text-base mt-4 mb-4 text-gray-700">
				<ChevronRightIcon className="w-4 inline mb-1" />
				<span className="inline">&nbsp;전체보기</span>
			</div>
		</>
	);
};

export default MyDaenamus;
