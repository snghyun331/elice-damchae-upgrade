import PropTypes from 'prop-types';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { textToColor } from '../Util/Util';

const MyDaenamuCard = ({ data: { mood, title, content} }) => {
  const moodColor = textToColor[mood];

  return (
    <a
      href="#"
      className="h-full block max-w-sm p-6 bg-white border border-gray-200 rounded-2xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      style={{ borderColor: moodColor }}
    >
      <div className="flex flex-col h-full">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title.length > 10
            ? `${title.slice(0, 10)}...`
            : title}
        </h5>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400 flex-grow">
          {content.length > 70
            ? `${content.slice(0, 70)}...`
            : content}
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
