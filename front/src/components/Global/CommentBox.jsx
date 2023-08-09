import { useState } from 'react';
import { textToIcon, formatCreatedAt, formatRelativeTime } from '../Util/Util';
import { useUserId } from '../../store/useUserStore';
import PropTypes from 'prop-types';

const CommentBox = ({ fetchComment, commentData, onDelete, onEdit }) => {
	const id = useUserId();
	const [editMode, setEditMode] = useState(false);
	const [editedComment, setEditedComment] = useState(commentData.comment);

	const handleEdit = async () => {
		try {
			setEditMode((prevEditMode) => !prevEditMode);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			await onDelete(commentData._id);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSaveEdit = async () => {
		try {
			await onEdit(commentData._id, editedComment);
			fetchComment();

			setEditMode(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancelEdit = () => {
		setEditedComment(commentData.comment);
		setEditMode(false);
	};

	return (
		<article className="p-5 mb-6 text-sm bg-white rounded-lg dark:bg-gray-900">
			<footer className="flex justify-between mb-2">
				<div className="space-x-2 items-center inline-flex mr-3 text-sm text-gray-900 dark:text-white">
					<div className="relative">
						{' '}
						<img
							src={
								commentData.writerId.profileImg
									? commentData.writerId.profileImg
									: commentData.writerId.mbtiImg
									? commentData.writerId.mbtiImg
									: '/images/default-image.jpg'
							}
							className="w-11 rounded-full"
						/>
						<p className="text-xl absolute top-5 left-6">
							{textToIcon[commentData.mood]}
						</p>
					</div>
					<div></div>
					<p className="font-gray-800">{commentData.writerId.nickname}</p>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{commentData.writerId.mbti}
					</p>
					<p className="text-xs text-gray-600 dark:text-gray-400">
						{formatRelativeTime(commentData.updatedAt)}
					</p>
				</div>

				{commentData.writerId._id === id && (
					<div className="justify-end">
						{editMode ? (
							<>
								<button
									onClick={handleCancelEdit}
									type="button"
									className="py-1 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-red-300 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								>
									취소
								</button>
								<button
									onClick={handleSaveEdit}
									type="button"
									className="py-1 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-blue-200 rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								>
									저장
								</button>
							</>
						) : (
							<>
								<button
									onClick={handleEdit}
									type="button"
									className="py-1 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-blue-200 rounded-full hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								>
									수정
								</button>
								<button
									onClick={handleDelete}
									type="button"
									className="py-1 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-red-300 rounded-full hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
								>
									삭제
								</button>
							</>
						)}
					</div>
				)}
			</footer>
			{editMode ? (
				<input
					type="text"
					value={editedComment}
					onChange={(e) => {
						setEditedComment(e.target.value);
					}}
					className="w-full h-10 p-2 mt-2 text-base text-gray-900 placeholder-gray-500 border rounded-lg appearance-none focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-gray-700"
				/>
			) : (
				<p className="mt-3 text-gray-500 dark:text-gray-400">
					{commentData.comment}
				</p>
			)}
		</article>
	);
};

CommentBox.propTypes = {
	commentData: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		mood: PropTypes.string.isRequired,
		writerId: PropTypes.shape({
			_id: PropTypes.string.isRequired,
			nickname: PropTypes.string.isRequired,
			mbti: PropTypes.string.isRequired,
		}).isRequired,
		comment: PropTypes.string.isRequired,
		updatedAt: PropTypes.string.isRequired,
	}).isRequired,
	fetchComment: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
};

export default CommentBox;
