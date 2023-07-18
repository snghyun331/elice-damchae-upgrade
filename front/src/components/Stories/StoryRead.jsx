// import { useParams } from 'react-router-dom';

const StoryRead = () => {
	console.log('스토리 리드 진입')
	// const { storyId } = useParams();
	// //storyId를 통해 개별 게시물에 대한 조회 요청 로직 들어감.
	// console.log(storyId);
	// const dummyData = [
	// 	{
	// 		_id: 1,
	// 		userId: '일순이',
	// 		userMbti: 'INTJ',
	// 		title: 'Story Title 1',
	// 		content: 'Story Description 1',
	// 		mood: '😊',
	// 		createdAt: '2023-07-18',
	// 	},
	// 	{
	// 		_id: 2,
	// 		userId: '일순이',
	// 		userMbti: 'INTJ',
	// 		title: 'Story Title 2',
	// 		content: 'Story Description 2',
	// 		mood: '😊',
	// 		createdAt: '2023-07-18',
	// 	},
	// ];

	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			스토리 읽기 영역
		</div>
	);
};

export default StoryRead;
