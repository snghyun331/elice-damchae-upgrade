import { useState, useEffect } from 'react';
import { postApi, getApi, delApi, patchApi } from '../../services/api';
import CommentBox from './CommentBox';
import PropTypes from 'prop-types';

const StoryComment = ({ storyId }) => {
	const [commentList, setCommentList] = useState('');
	const [comment, setComment] = useState('');

	const fetchData = async () => {
		try {
			const res = await getApi(`stories/${storyId}/comments`);
			console.log(res.data);
			setCommentList(res.data.comments);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteComment = async (commentId) => {
		try {
			await delApi(`stories/comments/${commentId}`);
			fetchData(); // Assuming you have a function fetchData to fetch updated commentList
		} catch (error) {
			console.log(error);
		}
	};

	const editComment = async (commentId, editedComment) => {
		try {
			await patchApi(`stories/comments/${commentId}`, {
				comment: editedComment,
			});
			fetchData(); // Assuming you have a function fetchData to fetch updated commentList
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async () => {
		console.log(comment);
		try {
			await postApi(`stories/${storyId}/comments`, {
				comment,
			});
			setComment('');
			fetchData();
		} catch (error) {
			console.log(error.response.data.errorMessage);
		}
	};
	return (
		<div className="p-6 flex flex-col">
			<h3 className="font-semibold">
				<span className="text-blue-600 text-2xl">{commentList.length}</span>{' '}
				개의 댓글
			</h3>
			<div className="flex flex-row space-x-2">
				<textarea
					className="p-3 my-5 w-[90%] border text-sm rounded-md"
					onChange={(e) => {
						setComment(e.target.value);
					}}
					id="comment"
					maxLength={200} // Add this line
					value={comment}
					placeholder="댓글을 입력하세요."
				/>

				<button
					disabled={!comment}
					className="h-16 w-[10%] my-5 text-sm font-medium text-gray-900 focus:outline-none bg-blue-500 disabled:bg-neutral-300 rounded-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
					onClick={handleSubmit}
				>
					등록
				</button>
			</div>

			<div>
				{commentList.length === 0 ? (
					<p>등록된 댓글이 없습니다.</p>
				) : (
					commentList.map((commentData) => (
						<div key={commentData._id}>
							<CommentBox
								commentData={commentData}
								onDelete={deleteComment}
								onEdit={editComment}
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default StoryComment;

StoryComment.propTypes = {
	storyId: PropTypes.string.isRequired,
};
