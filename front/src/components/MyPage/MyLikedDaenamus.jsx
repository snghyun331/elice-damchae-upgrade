import MyDaenamuCard from './MyDaenamuCard';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import { getApi } from '../../services/api';
import { useState, useEffect } from 'react';

const MyLikedDaenamus = () => {
	const [forests, setForests] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(false);

	const fetchDaenamus = async () => {
		try {
			const res = await getApi('my/likeForestPosts');
			console.log(res.data);
			setForests(res.data);
			setIsDataLoading(true);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchDaenamus();
	}, []);

	return (
		<>
			<div>
				<h3 className="text-2xl text-gray-700 font-semibold">
					내가 좋아한 대나무숲
				</h3>
				<div className="text-base mt-4 mb-4 text-gray-700">
					<ChevronRightIcon className="w-4 inline mb-1" />
					<span className="inline"> 전체보기</span>
					<div className="my-8 flex flex-wrap justify-center md:justify-center">
						{forests.slice(0, 3).map(({ postId }) => (
							<div
								key={postId._id}
								className={`w-full md:w-1/3 mb-4 px-1 md:px-2 mx-auto`}
							>
								<MyDaenamuCard forest={postId} />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default MyLikedDaenamus;
