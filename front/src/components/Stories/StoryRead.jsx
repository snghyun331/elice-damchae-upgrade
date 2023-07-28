import { textToIcon, textToColor, formatDate } from '../Util/Util';
import { Link } from 'react-router-dom';
import TextViewer from '../Global/TextViewer';
import { useParams } from 'react-router-dom';
import { getApi } from '../../services/api';
import { useEffect, useState } from 'react';
const StoryRead = () => {
	const { storyId } = useParams();
	const [story, setStory] = useState([]);
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	const fetchData = async () => {
		try {
			const res = await getApi(`stories/${storyId}`);
			setStory(res.data);
			setIsDataLoaded(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className={`w-4/5 max-w-2xl mx-auto dark:bg-gray-800`}>
			<button
				type="button"
				className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
			>
				<Link to="/stories">목록으로</Link>
			</button>

			<div
				className={`w-full max-w-2xl border border-gray-200 rounded-lg shadow mx-auto bg-white dark:bg-gray-800`}
				style={{
					backgroundColor: isDataLoaded ? textToColor[story.mood] : '#FFFFFF',
				}}
			>
				<div className="relative h-52 overflow-hidden rounded-t-lg">
					<img
						className="w-full h-full object-cover"
						src="https://picsum.photos/200/300"
						alt=""
					/>
					<div className="absolute inset-0 bg-black opacity-60"></div>

					<div className="ms-4 mt-4 absolute top-1 left-1 p-4 z-10 max-w-md">
						<p className="text-white mb-1">{formatDate(story.createdAt)}</p>
						<h5 className="leading-loose text-white text-2xl font-bold">
							{story.title}
						</h5>
					</div>
					<div className="text-sm text-end absolute top-1 right-1 mt-4 me-4">
						<p className="text-white mb-1">조회 123</p>
						<button className="text-white underline underline-offset-2 text-red-400">
							삭제
						</button>
					</div>
				</div>

				<div>
					<div className="relative -top-20 left-6 max-w-md">
						<span className="text-9xl">{textToIcon[story.mood]}</span>
					</div>
					<div className="-mt-12 p-14 leading-relaxed text-gray-700 dark:text-gray-400">
						<TextViewer />
					</div>

					<div>
						<div className="w-12 h-12 mx-auto mt-6 rounded-full overflow-hidden">
							<img
								className="w-full h-full object-cover"
								src={story.profileImg}
								alt="작성자 프로필 이미지"
							/>
						</div>
						<h5 className="text-center text-gray-700 mx-auto mt-2">
							{isDataLoaded && story.userInfo.nickname}
						</h5>
						<p className="text-gray-400 text-xs text-center mt-1 mb-5">
							{isDataLoaded && story.userInfo.mbti}
						</p>
					</div>
					<hr className="h-px my-8 ms-8 me-8 bg-gray-300 border-0 dark:bg-gray-700" />
					<div>댓글 컴포넌트 넣을 영역</div>
				</div>
			</div>
		</div>
	);
};

export default StoryRead;
