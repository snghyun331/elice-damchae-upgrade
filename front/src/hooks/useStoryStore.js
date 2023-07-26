import { useState } from 'react';
import { postApi } from '../services/api';
import useStoryGlobalStore from '../store/useStoryGlobalStore';

const useStoryStore = () => {
	const {
		title,
		content,
		thumbnail,
		mood,
		music,
		phrase,

		setTitle,
		setContent,
		setThumbnail,
		setMood,
		setMusic,
		setPhrase,
	} = useStoryGlobalStore();

	const [localThumbnail, setLocalThumbnail] = useState('');
	const [stableThumbnail, setStableThumbnail] = useState('');
	const [isPublic, setIsPublic] = useState(true);
	const [storyModal, setStoryModal] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	const postStory = async (post) => {
		try {
			await postApi('/stories', post);
			window.location.href = '/stories';
		} catch (error) {
			setErrMsg(error.response.data.errorMessage);
		}
	};

	const reset = () => {
		setTitle('');
		setContent('');
		setMood('');
		setMusic('');
		setPhrase('');
		setStableThumbnail('');
		setIsPublic(true);
	};

	return {
		title,
		content,
		thumbnail,
		localThumbnail,
		stableThumbnail,
		isPublic,
		mood,
		music,
		phrase,
		storyModal,
		errMsg,
		setErrMsg,

		setTitle,
		setContent,
		setThumbnail,
		setLocalThumbnail,
		setStableThumbnail,
		setIsPublic,
		setMood,
		setMusic,
		setPhrase,
		setStoryModal,

		postStory,
		reset,
	};
};

export default useStoryStore;
