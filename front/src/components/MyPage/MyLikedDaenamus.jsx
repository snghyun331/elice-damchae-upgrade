import MyDaenamuCard from './MyDaenamuCard';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

const MyLikedDaenamus = ({ myDaenamu }) => {
  return (
    <>
	<div>
      <h3 className="text-2xl text-gray-700 font-semibold">내가 좋아한 대나무숲</h3>
      <div className="text-base mt-4 mb-4 text-gray-700">
        <ChevronRightIcon className="w-4 inline mb-1" />
        <span className="inline"> 전체보기</span>
        <div className="my-8 flex flex-wrap justify-center md:justify-center">
          {myDaenamu.map((data) => (
            <div
              key={data.title}
              className={`w-full md:w-1/3 mb-4 px-1 md:px-2 mx-auto`}
            >
              <MyDaenamuCard data={data} />
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
