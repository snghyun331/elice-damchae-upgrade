import React from 'react';

const DaenamusCardDetail = ({ match }) => {
  const post = {
    id: match.params.id,
    title: '게시글 제목',
    content: '게시글 본문 내용이 여기에 들어갑니다.',
    author: '작성자',
    views: 100,
    likes: 50,
    dislikes: 10,
  };

  // TODO: 수정 버튼과 삭제 버튼의 기능 구현

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold">게시글 ID: {post.id}</h2>
      <h3 className="text-xl font-semibold mt-2">제목: {post.title}</h3>
      <p className="text-sm text-gray-500">작성자: {post.author}</p>
      <p className="text-sm text-gray-500">조회수: {post.views}</p>
      <hr className="my-4" />
      <p className="text-base">{post.content}</p>
      <hr className="my-4" />
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
          좋아요 {post.likes}
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          싫어요 {post.dislikes}
        </button>
      </div>
      <br />
      {/* TODO: 수정 버튼과 삭제 버튼은 여기에 추가 */}
    </div>
  );
};

export default DaenamusCardDetail;