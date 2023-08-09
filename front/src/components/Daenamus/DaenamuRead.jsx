import { textToIcon, textToColor, formatRelativeTime } from '../Util/Util';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import BackButton from '../Global/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { delApi, getApi, putApi } from '../../services/api';
import { useEffect, useState } from 'react';
import { useUserId } from '../../store/useUserStore';
import { toast } from 'react-hot-toast';

import ReactionChart from './Reaction';
import DaenamuLikeSection from './DaenamuLikeSection';
import DaenamuTextEditor from './DaenamuTextEditor';
import useForestStore from '../../store/useForestStore';
import DaenamuComment from './DaenamuComment';

const DaenamuRead = () => {
	const { title, content, mood, setTitle, setContent, setMood, commentList } =
		useForestStore();
	const { forestId } = useParams();
	const [forest, setForest] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [viewerKey, setViewerKey] = useState(0);
	const navigate = useNavigate();
	const id = useUserId();
	const fetchForest = async () => {
		try {
			const res = await getApi(`forest/${forestId}`);
			console.log(res.data);
			setForest(res.data);
			setIsDataLoading(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleConfirm = () => {
		toast((t) => (
			<div className="rounded p-4">
				<div>정말로 삭제하시겠습니까?</div>
				<div className="mt-3 flex justify-end">
					<button
						onClick={() => {
							handleDelete();
							toast.dismiss(t.id);
						}}
						className="text-white px-2 py-1 rounded mr-2 bg-green-500 hover:bg-green-600"
					>
						예
					</button>
					<button
						onClick={() => {
							toast.dismiss(t.id);
							// 필요한 후속 동작 수행
						}}
						className="text-white px-2 py-1 rounded bg-red-500 hover:bg-red-600"
					>
						아니오
					</button>
				</div>
			</div>
		));
	};

	const handleDelete = async () => {
		try {
			await delApi(`forest/${forestId}`);
			navigate('/daenamus');
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = () => {
		setEditMode(true);
		setTitle(forest.title);
		setContent(forest.content);
		setMood(forest.mood);
	};

	const handleCancelEdit = () => {
		setTitle(forest.title);
		setContent(forest.content);
		setMood('');
		setEditMode(false);
	};

	const handleSaveEdit = async () => {
		try {
			await putApi(`forest/${forestId}`, {
				title,
				content,
				mood,
			});
			//TODO:mood추가해야함
			fetchForest();

			setEditMode(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchForest();
	}, []);

	useEffect(() => {
		setViewerKey((prevKey) => prevKey + 1);
	}, [forest.content]);

	return (
		<div className={`w-4/5 max-w-2xl mx-auto dark:bg-gray-800`}>
			<BackButton />
			<div
				className={`w-full max-w-2xl border border-gray-200 rounded-lg shadow mx-auto bg-white dark:bg-gray-800`}
				style={{
					backgroundColor: isDataLoading ? textToColor[forest.mood] : '#FFFFFF',
				}}
			>
				{' '}
				<div className="justify-end">
					{isDataLoading && forest.userInfo == id && (
						<>
							{editMode ? (
								<div className="mr-4 mt-4 flex flex-row justify-end">
									<button
										onClick={handleCancelEdit}
										className="underline underline-offset-2 text-red-400"
									>
										취소
									</button>
									<button
										onClick={handleSaveEdit}
										className="ml-2 underline underline-offset-2 text-blue-400"
									>
										저장
									</button>
								</div>
							) : (
								<div className="mr-4 mt-4 flex flex-row justify-end">
									<button
										onClick={handleEdit}
										className="justify-end underline underline-offset-2 text-black"
									>
										수정
									</button>
									<button
										onClick={handleConfirm}
										className="justify-end ml-2 underline underline-offset-2 text-black"
									>
										삭제
									</button>
								</div>
							)}
						</>
					)}
				</div>
				<div className="relative top-0 px-5 md:px-10">
					{editMode ? (
						//TODO:제목 길어지면 박스무너짐
						<DaenamuTextEditor />
					) : (
						<div className="view-mode">
							<div className="relative h-40 rounded-t-lg">
								<div className="flex flex-col absolute h-full w-full p-4">
									<div className="flex flex-row items-center">
										<div className="text-2xl">
											{isDataLoading && textToIcon[forest.mood]}
										</div>
										<h5 className="py-5 leading-loose text-lg md:text-2xl font-bold">
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
											<p className="mb-1">
												조회수 {isDataLoading && forest.views}
											</p>
											<p className="self-end text-xs mb-1">
												{isDataLoading && formatRelativeTime(forest.updatedAt)}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="relative p-10">
									{isDataLoading && (
										<Viewer key={viewerKey} initialValue={forest.content} />
									)}
								</div>
							</div>
						</div>
					)}
				</div>
				<div className="flex flex-col">
					<DaenamuLikeSection forestId={forest._id} userId={id} />
					<hr className="h-px bg-gray-300 border-0 dark:bg-gray-700" />
					{commentList && commentList.length > 0 ? (
						<div>
							<ReactionChart commentList={commentList} forestId={forestId} />
						</div>
					) : (
						<div></div>
					)}

					<hr className="h-px bg-gray-300 border-0 dark:bg-gray-700" />
					<div>
						<DaenamuComment forestId={forestId} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DaenamuRead;
