import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import { textToIcon, calendarDateToString } from '../Util/Util';
import { useNavigate } from 'react-router-dom';
function MyCalendar({ posts }) {
	const navigate = useNavigate();
	const simplePost = posts.map(({ koreaCreatedAt, mood, _id }) => ({
		date: new Date(koreaCreatedAt).toISOString().split('T')[0],
		mood: textToIcon[mood],
		_id,
	}));

	const getDataFromDate = (date) => {
		const dateString = calendarDateToString(date);
		const data = simplePost.find((item) => item.date === dateString);
		return data;
	};

	const renderTileContent = ({ date, view, activeStartDate }) => {
		const currentMonthInView = activeStartDate.getMonth();
		const dateMonth = date.getMonth();
		const data = getDataFromDate(date);

		if (view === 'month' && currentMonthInView === dateMonth) {
			return (
				<div className="tileContentWrapper">
					<span className="text-3xl">{data ? data.mood : '⚪'}</span>
				</div>
			);
		} else {
			return (
				<div className="tileContentWrapper">
					<span className="text-4xl">{'　'}</span>
				</div>
			);
		}
	};

	const handleDateClick = (date) => {
		const data = getDataFromDate(date);
		if (data) {
			navigate(`/stories/${data._id}`);
		}
	};

	return (
		<div>
			<Calendar
				className="mt-5 p-1.5" // Add the custom CSS class to Calendar
				tileContent={renderTileContent}
				formatDay={(locale, date) =>
					date.toLocaleString('en', { day: 'numeric' })
				}
				formatShortWeekday={(locale, date) =>
					date.toLocaleString('en', { weekday: 'short' })
				}
				onClickDay={handleDateClick}
			/>
		</div>
	);
}
MyCalendar.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default MyCalendar;
