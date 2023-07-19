import PropTypes from 'prop-types';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { moodColors } from '../Util/Util';

const MyDaenamuCard = ({ data }) => {
  const moodColor = moodColors[data.mood];

  return (
    <a
      href="#"
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      style={{ borderColor: moodColor }}
    >
      <div className="flex flex-col h-full">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title.length > 10
            ? `${data.title.slice(0, 10)}...`
            : data.title}
        </h5>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400 flex-grow">
          {data.content.length > 70
            ? `${data.content.slice(0, 70)}...`
            : data.content}
        </p>
        <div className="flex w-16 items-center text-xs font-medium text-center text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto self-end pt-4">
          <ChevronRightIcon className="w-4 mt-1" />
          <span className="ml-1">더보기</span>
        </div>
      </div>
    </a>
  );
};

MyDaenamuCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MyDaenamuCard;
