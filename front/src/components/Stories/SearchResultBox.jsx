import PropTypes from 'prop-types';
import {
	removeTag,
	truncateString,
	colorQueryText,
	formatRelativeTime,
	textToKorean,
} from '../Util/Util';
import { useParams } from 'react-router-dom';

const SearchResultBox = ({ data }) => {
	const params = useParams();
	console.log(params.searchQuery);
	const { commentCount, content, createdAt, mood, title, userInfo } = data;

	return (
		<>
			<div className="text-gray-500 dark:text-gray-400">
				<p className="mb-3 text-lg md:text-xl">
					{colorQueryText({
						text: truncateString(removeTag(title), 30),
						query: params.searchQuery,
					})}
					{commentCount && commentCount > 0 ? (
						<span className="text-sm text-blue-700"> ({commentCount})</span>
					) : null}
				</p>
				<p className="my-3">
					{colorQueryText({
						text: truncateString(removeTag(content), 200),
						query: params.searchQuery,
					})}
				</p>
				<span>{userInfo ? userInfo.nickname : '알 수 없는 사용자'}</span> |{' '}
				<span>{formatRelativeTime(createdAt)}</span> |{' '}
				<span>{mood ? textToKorean[mood] : ''}</span>
				<hr className="my-8" />
			</div>
		</>
	);
};

SearchResultBox.propTypes = {
	data: PropTypes.shape({
		commentCount: PropTypes.number,
		content: PropTypes.string,
		createdAt: PropTypes.string,
		mood: PropTypes.string,
		title: PropTypes.string,
		userInfo: PropTypes.shape({
			nickname: PropTypes.string,
		}),
	}),
};
export default SearchResultBox;
