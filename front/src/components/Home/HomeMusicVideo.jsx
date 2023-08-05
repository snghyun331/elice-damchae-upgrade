import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

const HomeMusicVideo = ({ music }) => {
	const [videoWidth, setVideoWidth] = useState('1000');

	useEffect(() => {
		const updateVideoWidth = () => {
			if (window.innerWidth >= 1500) {
				setVideoWidth('1500');
			} else {
				setVideoWidth(window.innerWidth * 0.7);
			}
		};

		const handleResize = debounce(updateVideoWidth, 200);

		updateVideoWidth();
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const opts = {
		width: videoWidth,
		height: '900',
		playerVars: {
			controls: 0,
			disablekb: 0,
			autoplay: 0,
			rel: 0,
			modestbranding: 1,
		},
	};

	return (
		<div className="w-full space-y-3 p-6 border-gray-200 dark:border-gray-600">
			<YouTube videoId={music} opts={opts} />
		</div>
	);
};

HomeMusicVideo.propTypes = {
	music: PropTypes.string.isRequired,
};

export default HomeMusicVideo;
