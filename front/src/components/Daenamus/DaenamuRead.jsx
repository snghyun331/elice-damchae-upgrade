import { textToIcon, textToColor, formatDate } from '../Util/Util';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { delApi, getApi } from '../../services/api';
import { useEffect, useState } from 'react';
import useUserStore from '../../store/useUserStore';
import StoryComment from '../Stories/StoryComment';

const DaenamuRead = () => {
	const { storyId } = useParams();
	const [story, setStory] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const navigate = useNavigate();

	const { id } = useUserStore();

	const fetchData = async () => {
		try {
			const res = await getApi(`stories/64c258318804a84f0655e688`);
			console.log(res);
			setStory(res.data);
			setIsDataLoading(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			await delApi(`stories/${storyId}`);
			navigate('/stories');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>ddd</div>
		// <div className={`w-4/5 max-w-2xl mx-auto dark:bg-gray-800`}>
		// 	<button
		// 		type="button"
		// 		className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
		// 	>
		// 		<Link to="/daenamus">목록으로</Link>
		// 	</button>

		// 	<div
		// 		className={`w-full max-w-2xl border border-gray-200 rounded-lg shadow mx-auto bg-white dark:bg-gray-800`}
		// 		style={{
		// 			backgroundColor: isDataLoading ? textToColor[story.mood] : '#FFFFFF',
		// 		}}
		// 	>
		// 		<div className="relative h-52 overflow-hidden rounded-t-lg">
		// 			<div className="absolute inset-0 bg-black opacity-60">
		// 				<div className="absolute p-4">
		// 					<p className="text-white mb-1">
		// 						조회수 {isDataLoading && story.views}
		// 					</p>
		// 					<p className="text-xs text-white mb-1">
		// 						{isDataLoading && formatDate(story.createdAt)}
		// 					</p>
		// 					<div className="flex flex-row items-center">
		// 						<div className="text-2xl">
		// 							{isDataLoading && textToIcon[story.mood]}
		// 						</div>
		// 						<h5 className="leading-loose text-white text-2xl font-bold">
		// 							{story.title}
		// 						</h5>
		// 					</div>
		// 					<div className="space-x-2 items-center inline-flex mr-3 text-sm text-gray-900 dark:text-white">
		// 						<img
		// 							className="w-full h-full object-cover"
		// 							// src={isDataLoading && story.userInfo.profileImg}
		// 							src={'images/thumnail.jpg'}
		// 							alt=""
		// 						/>
		// 						<p className="w-20 text-sm text-gray-600 dark:text-gray-400">
		// 							{isDataLoading && story.userInfo.nickname}
		// 						</p>
		// 						<p className="text-sm text-gray-600 dark:text-gray-400">
		// 							{isDataLoading && story.userInfo.mbti}
		// 						</p>
		// 					</div>
		// 				</div>
		// 			</div>
		// 			<div className="text-sm text-end absolute top-1 right-1 mt-4 me-4">
		// 				{isDataLoading && story.userInfo._id == id && (
		// 					<>
		// 						<button
		// 							onClick={handleDelete}
		// 							className="ml-2 text-white underline underline-offset-2 text-red-400"
		// 						>
		// 							삭제
		// 						</button>
		// 					</>
		// 				)}
		// 			</div>
		// 		</div>

		// 		<div className="flex flex-col">
		// 			<div className="relative top-0 p-10">
		// 				{isDataLoading && <Viewer initialValue={story.content} />}
		// 			</div>

		// 			<hr className="h-px bg-gray-300 border-0 dark:bg-gray-700" />
		// 			<div>
		// 				<StoryComment storyId={storyId} commentList={story.commentList} />
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default DaenamuRead;
