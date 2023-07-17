const StoryCard = () => {
  return (
    <>
      <div
        className={`border border-[0.3rem] border-solid rounded-2xl p-4 my-4`}
      >
        <div className="flex items-center justify-center">
          <figure className="max-w-lg w-[21rem] h-[16rem] overflow-hidden">
            <img
              className="w-full h-full object-cover object-center rounded-lg"
              src="https://i.insider.com/60638bd66183e1001981966a?width=1136&format=jpeg"
              alt="image description"
              onError={(e) => {
                e.target.src =
                  "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg";
              }}
            />
          </figure>
        </div>
        <div className="px-4 py-8">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryCard;
