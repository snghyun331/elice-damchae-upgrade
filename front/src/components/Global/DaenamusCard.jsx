import { Link } from 'react-router-dom';
import React from 'react';

const DaenamusCard = ({ postId }) => {
  // 가상의 게시글 데이터를 대신하여 실제 데이터를 사용해야 합니다.
  const post = {
    id: postId,
    title: '게시글 제목',
    content: '게시글 본문 내용이 여기에 들어갑니다.',
    author: '작성자',
    views: 100,
    likes: 50,
    dislikes: 10,
  };


  return (
    <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-4">
      <div className="border border-[0.3rem] border-solid rounded-2xl h-full">
        {/* 클릭 시 해당 카드의 상세 페이지로 이동하는 Link 컴포넌트로 감싸기 */}
        <Link to={`/daenamus/${post.id}`}>
         <div className="flex items-center justify-center h-2/3">
          <figure className="h-44 sm:h-56 lg:h-64 overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://i.insider.com/60638bd66183e1001981966a?width=1136&format=jpeg"
              alt="image description"
              onError={(e) => {
                e.target.src =
                  "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg";
              }}
            />
          </figure>
        </div>
        <div className="p-4 h-1/3">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
            {/*post.title*/}
          </h5>

          <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            {/*post.content*/}
          </p>
          <div className="flex items-center justify-center">
            <button className="px-3 py-1 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
          
        </div>
        </Link>
      </div>
    </div>
  );
};

export default DaenamusCard;