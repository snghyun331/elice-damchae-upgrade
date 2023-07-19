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

			<div className="flex justify-center flex-wrap">
				<div className="flex flex-col md:flex-row">
					{/* MyCalendar */}
					<div className="md:w-1/2 lg:w-1/2 p-2">
						<MyCalendar dateMoodData={dummyData} />
					</div>
					<div className="md:w-1/2 lg:w-1/2 p-2">
						<div className="md:flex md:flex-col md:h-full">
							{/* MyMainMood */}
							<div className="p-5">
								<MyMainMood />
							</div>
							{/* MyMoodStat */}
							<div className="p-5">
								<MyMoodStat />
							</div>
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
