import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const MusicVideo = ({ videoId }) => {
	const [videoWidth, setVideoWidth] = useState('560');

	const isDesktop = useMediaQuery({ query: '(min-width: 1724px)' });
	const isTablet = useMediaQuery({
		query: '(min-width: 700px) and (max-width: 1723px)',
	});
	const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

	useEffect(() => {
		if (isDesktop) {
			setVideoWidth('560');
		} else if (isTablet) {
			setVideoWidth('560');
		} else if (isMobile) {
			setVideoWidth('280');
		}
	}, [isMobile, isTablet, isDesktop]);

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
		<div className="space-y-3 p-6  border-gray-200 dark:border-gray-600">
			{/* YouTube 영상을 여기에 표시하는 코드 추가 */}
			<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
				행복하시다니 다행이네요.이 노래는 어때요?
			</h3>
			<YouTube videoId={videoId} opts={opts} />
		</div>
	);
};

MusicVideo.propTypes = {
	videoId: PropTypes.string.isRequired,
};

export default MusicVideo;
