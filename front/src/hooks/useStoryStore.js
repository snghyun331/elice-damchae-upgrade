import { useState } from 'react';
import { postApi } from '../services/api';
import useStoryGlobalStore from '../store/useStoryGlobalStore';

const useStoryStore = () => {
	const {
		content,
		mood,
		music,
		phrase,
		setContent,
		setMood,
		setMusic,
		setPhrase,
	} = useStoryGlobalStore();

	const [title, setTitle] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [isPublic, setIsPublic] = useState(false);
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

	return {
		title,
		content,
		thumbnail,
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
		setIsPublic,
		setMood,
		setMusic,
		setPhrase,
		setStoryModal,

		postStory,
	};
};

export default useStoryStore;
