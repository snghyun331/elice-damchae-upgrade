import MyComments from './MyComments';
import MyCalendar from './MyCalendar';
import MyMainMood from './MyMainMood';
import MyMoodStat from './MyMoodStat';

import { ChevronRightIcon } from '@heroicons/react/24/solid';

const MyPage = () => {
	const dummyData = [
		{ date: '2023-07-18', mood: '😊' },
		{ date: '2023-07-19', mood: '😢' },
	];
	return (
		<div className="lg:px-52">
			<h3 className="text-3xl text-gray-700 font-semibold">나의 활동</h3>
			<br />
			<hr />
			<div className="mt-8">
				<h3 className="text-2xl text-gray-700 font-semibold">내가 쓴 스토리</h3>
				<div className="text-base mt-4 mb-4 text-gray-700">
					<ChevronRightIcon className="w-4 inline" />
					<span className="inline">&nbsp;전체보기</span>
				</div>
			</div>

			{/* Change this div to use flexbox */}
			<div className="flex justify-center">
				<div className="inline-flex">
					<MyCalendar dateMoodData={dummyData} />
					<div className="w-full h-full grid grid-rows-2 ">
						<div className="row-span-1 p-5">
							<MyMainMood />
						</div>
						<div className="row-span-1 ml-5 -mt-9">
							<MyMoodStat />
						</div>
					</div>
				</div>
			</div>
			<hr />
			<MyComments />
		</div>
	);
};

export default MyPage;
