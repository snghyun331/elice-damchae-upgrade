import Search from "../global/Search";
import StoryCard2 from "../global/StoryCard2";

const Story = () => {
  return (
    <>
      <div className="font-bold mb-8 md:p-10 block p-6 bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="mb-10 text-3xl font-semibold">내 스토리</div>
        <div className="mb-10">
          <Search />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-lg font-medium">
          <div>
            <StoryCard2 />
          </div>
          <div>
            <StoryCard2 />
          </div>
          <div>
            <StoryCard2 />
          </div>
          <div>
            <StoryCard2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
