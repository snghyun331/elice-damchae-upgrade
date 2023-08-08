import MyDaenamuCard from './MyDaenamuCard';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import { getApi } from '../../services/api';
import { useState, useEffect } from 'react';

const MyLikedDaenamus = ({ myDaenamu }) => {
	const [forests, setForests] = useState([]);

	const fetchDaenamus = async () => {
		try {
			const res = await getApi('forest/my');
			setForests(res.data.forests);
			console.log("내가좋아한", forests);
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
						{myDaenamu.map((data) => (
							<div
								key={data.title}
								className={`w-full md:w-1/3 mb-4 px-1 md:px-2 mx-auto`}
							>
								{/* <MyDaenamuCard data={data} /> */}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

MyLikedDaenamus.propTypes = {
	myDaenamu: PropTypes.array.isRequired,
};

export default MyLikedDaenamus;
