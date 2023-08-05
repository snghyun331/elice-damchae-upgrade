import { useEffect, useState } from 'react';
import {
	HandThumbDownIcon,
	HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { postApi, delApi, getApi } from '../../services/api';
import toast from 'react-hot-toast';

const DaenamuLikeSection = ({ forestId, userId }) => {
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);

	const [didUserLiked, setDidUserLiked] = useState(false);
	const [didUserDisliked, setDidUserDisliked] = useState(false);

	useEffect(() => {
		const fetchLike = async () => {
			const likesResponse = await getApi(`forest/${forestId}/getLikes`);
			const dislikesResponse = await getApi(`forest/${forestId}/getDislikes`);
			setLikes(likesResponse.data.likes.length);
			console.log(likesResponse.data);
			console.log(dislikesResponse.data);
			setDislikes(dislikesResponse.data.dislikes.length);
			const userLiked = likesResponse.data.likes.some(
				(like) => like.userId === userId,
			);
			setDidUserLiked(userLiked);

			const userDisliked = dislikesResponse.data.dislikes.some(
				(dislike) => dislike.userId === userId,
			);
			setDidUserDisliked(userDisliked);
		};

		if (forestId) {
			fetchLike();
		}
	}, [forestId]);

	useEffect(() => {
		setLiked(didUserLiked);
		setDisliked(didUserDisliked);
		console.log(didUserLiked);
		console.log(didUserDisliked);
	}, [didUserLiked, didUserDisliked]);

	const handleToggleLike = async () => {
		try {
			if (!liked) {
				setLiked(true);
				if (disliked) {
					setDisliked(false);
					const unDislikeResponse = await delApi(
						`forest/${forestId}/unDislike`,
					);
					if (unDislikeResponse.error) {
						toast.error(unDislikeResponse.error);
					} else {
						setDislikes(dislikes - 1);
					}
					toast('싫어요를 취소하고 좋아요를 누릅니다.');
				}
				const response = await postApi(`forest/${forestId}/upLike`, {});
				if (response.error) {
					toast.error(response.error);
				} else {
					setLikes(likes + 1);
				}
			} else {
				setLiked(false);
				const response = await delApi(`forest/${forestId}/unLike`);
				if (response.error) {
					toast.error(response.error);
				} else {
					setLikes(likes - 1);
				}
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleToggleDislike = async () => {
		try {
			if (!disliked) {
				setDisliked(true);
				if (liked) {
					setLiked(false);
					const unLikeResponse = await delApi(`forest/${forestId}/unLike`);
					if (unLikeResponse.error) {
						toast.error(unLikeResponse.error);
					} else {
						setLikes(likes - 1);
					}
					toast('좋아요를 취소하고 싫어요를 누릅니다.');
				}
				const response = await postApi(`forest/${forestId}/upDislike`, {});
				if (response.error) {
					toast.error(response.error);
				} else {
					setDislikes(dislikes + 1);
				}
			} else {
				setDisliked(false);
				const response = await delApi(`forest/${forestId}/unDislike`);
				if (response.error) {
					toast.error(response.error);
				} else {
					setDislikes(dislikes - 1);
				}
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<>
			<div className="text-gray-700 m-5 mb-12 flex flex-row justify-center space-x-2 p-5 mx-52">
				<div className="flex items-center">
					<span className="mr-3 font-bold">{likes}</span>
					<HandThumbUpIcon
						className={`cursor-pointer w-7 h-7 ${
							liked ? 'text-blue-500' : 'text-gray-400'
						}`}
						onClick={handleToggleLike}
					/>
				</div>
				<div className="pl-6 flex items-center">
					<HandThumbDownIcon
						className={`cursor-pointer w-7 h-7 ${
							disliked ? 'text-red-500' : 'text-gray-400'
						}`}
						onClick={handleToggleDislike}
					/>
					<span className="ml-3 font-bold">{dislikes}</span>
				</div>
			</div>
		</>
	);
};

export default DaenamuLikeSection;
