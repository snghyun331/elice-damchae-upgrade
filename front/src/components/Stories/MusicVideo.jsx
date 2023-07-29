import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const MusicVideo = ({ music, phrase }) => {
	const [videoWidth, setVideoWidth] = useState('560');

	const updateVideoWidth = () => {
		if (window.innerWidth >= 680) {
			setVideoWidth('560');
		} else {
			setVideoWidth(window.innerWidth * 0.7);
		}
	};

	// Create a debounced version of the updateVideoWidth function
	const handleResize = debounce(updateVideoWidth, 200); // Adjust the debounce wait time as needed (e.g., 200ms)

	useEffect(() => {
		// Add the event listener on component mount
		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	const opts = {
		width: videoWidth,
		height: '315',
		playerVars: {
			controls: 0,
			disablekb: 0,
			autoplay: 1,
			rel: 0,
			modestbranding: 1,
		},
	};

	return (
		<div className="space-y-3 p-6 border-gray-200 dark:border-gray-600">
			{/* YouTube 영상을 여기에 표시하는 코드 추가 */}
			<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
				{phrase}
			</h3>
			<div className="justify-center">
				<YouTube videoId={music} opts={opts} />
			</div>
		</div>
	);
};

MusicVideo.propTypes = {
	music: PropTypes.string.isRequired,
	phrase: PropTypes.string.isRequired,
};

export default MusicVideo;
