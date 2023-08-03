import { textToIcon, textToColor, formatRelativeTime } from '../Util/Util';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import {
	HandThumbDownIcon,
	HandThumbUpIcon,
} from '@heroicons/react/24/outline';

import { BackButton } from '../Global/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { delApi, getApi } from '../../services/api';
import { useEffect, useState } from 'react';
import { useUserId } from '../../store/useUserStore';
import StoryComment from '../Stories/StoryComment';
import ReactionChart from './Reaction';

const DaenamuRead = () => {
	const { forestId } = useParams();
	const [forest, setForest] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const navigate = useNavigate();
	const id = useUserId();

	const fetchData = async () => {
		try {
			const res = await getApi(`forest/${forestId}`);
			console.log(res);
			setForest(res.data);
			setIsDataLoading(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			await delApi(`forest/${forestId}`);
			navigate('/daenamus');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className={`w-4/5 max-w-2xl mx-auto dark:bg-gray-800`}>
			<BackButton />
			<div
				className={`w-full max-w-2xl border border-gray-200 rounded-lg shadow mx-auto bg-white dark:bg-gray-800`}
				style={{
					backgroundColor: isDataLoading ? textToColor[forest.mood] : '#FFFFFF',
				}}
			>
				<div className="relative h-40 overflow-hidden rounded-t-lg">
					<div className="absolute w-full p-4">
						<div className="flex flex-row items-center">
							<div className="text-2xl">
								{isDataLoading && textToIcon[forest.mood]}
							</div>
							<h5 className="p-5 leading-loose text-2xl font-bold">
								{forest.title}
							</h5>
						</div>
						<div className="w-full justify-between space-x-2 items-center inline-flex mr-3 text-sm text-gray-900 dark:text-white">
							<div className="flex flex-row space-x-2">
								<img
									className="w-10 h-10 object-cover"
									// src={isDataLoading && forest.userInfo.profileImg}
									src={
										'https://png.pngtree.com/png-vector/20191115/ourmid/pngtree-beautiful-profile-line-vector-icon-png-image_1990469.jpg'
									}
									alt=""
								/>
								<div className="flex flex-col ">
									<p className="w-20 text-sm dark:text-gray-400">
										{isDataLoading && forest.userInfo.nickname}
									</p>
									<p className="text-sm dark:text-gray-400">
										{isDataLoading && forest.userInfo.mbti}
									</p>
								</div>
							</div>
							<div className="justify-end flex flex-col">
								<p className="mb-1">조회수 {isDataLoading && forest.views}</p>
								<p className="self-end text-xs mb-1">
									{isDataLoading && formatRelativeTime(forest.updatedAt)}
								</p>
							</div>
						</div>
					</div>

					<div className="text-sm text-end absolute top-1 right-1 mt-4 me-4">
						{isDataLoading && forest.userInfo._id == id && (
							<>
								<button
									onClick={handleDelete}
									className="ml-2 underline underline-offset-2 text-red-400"
								>
									삭제
								</button>
							</>
						)}
					</div>
				</div>

				<div className="flex flex-col">
					<div className="relative top-0 p-10">
						{isDataLoading && <Viewer initialValue={forest.content} />}
					</div>

					<div className="m-5 flex flex-row justify-center space-x-2">
						<HandThumbUpIcon className="w-10 h-10" />
						<HandThumbDownIcon className="w-10 h-10" />
					</div>

					<hr className="h-px bg-gray-300 border-0 dark:bg-gray-700" />
					<ReactionChart />
					<hr className="h-px bg-gray-300 border-0 dark:bg-gray-700" />
					<div>
						<StoryComment
							storyId={'64c75002eb1683cb6922e36f'}
							commentList={forest.commentList}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DaenamuRead;
