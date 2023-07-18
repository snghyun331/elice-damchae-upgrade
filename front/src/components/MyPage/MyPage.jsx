import MyComments from './MyComments';
import MyCalendar from './MyCalendar';
import MyMainMood from './MyMainMood';
import MyMoodStat from './MyMoodStat';

const MyPage = () => {
	const dummyData = [
		{ date: '2023-07-18', mood: '😊' },
		{ date: '2023-07-19', mood: '😢' },
	];
	return (
		<div className="lg:px-52">
			<h3 className="text-3xl text-gray-700 font-semibold">나의 활동</h3>
			<hr />
			<h3 className="text-2xl text-gray-700 font-semibold">내가 쓴 스토리</h3>
			<MyCalendar dateMoodData={dummyData} />
			<MyMainMood />
			<MyMoodStat />

			<hr />
			<MyComments />
		</div>
	);
};

export default MyPage;
