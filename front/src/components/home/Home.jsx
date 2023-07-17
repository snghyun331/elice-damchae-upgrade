import { useState } from 'react';
import StoryCreateModal from './StoryCreateModal'; // Modal 파일 경로에 맞게 수정

const Home = () => {
  const [showStoryCreateModal, setShowStoryCreateModal] = useState(false);

  const handleButtonClick = () => {
    setShowStoryCreateModal(true);
  };

  const handleModalClose = () => {
    setShowStoryCreateModal(false);
  };

  return (
    <div>
      홈페이지 영역
      <br />
      <button
        type="button"
        onClick={handleButtonClick}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        스토리 쓰기
      </button>

      {/* 모달 렌더링 */}
      {showStoryCreateModal && (
        <>
          <StoryCreateModal
            showStoryCreateModal={showStoryCreateModal}
            handleModalClose={handleModalClose}
          />
          <button
            type="button"
            onClick={handleModalClose}
            className="fixed inset-0 w-full h-full bg-black opacity-60 cursor-default"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
};

export default Home;
