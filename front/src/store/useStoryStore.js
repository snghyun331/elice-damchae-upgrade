import { create } from 'zustand';
import { postApi } from '../services/api';

const useStoryStore = create((set) => ({
	title: '',
	content: '',
	thumbnail: null,
	isPublic: false,
	mood: '',
	music: '',
	phrase: '',
	storyModal: false,

	setTitle: (title) => set({ title }),
	setContent: (content) => set({ content }),
	setThumbnail: (url) => set({ thumbnail: url }),
	setIsPublic: (isPublic) => set({ isPublic }),
	setMood: (mood) => set({ mood }),
	setMusic: (music) => set({ music }),
	setPhrase: (phrase) => set({ phrase }),
	setStoryModal: (storyModal) => set({ storyModal }),

	recommend: async (content) => {
		try {
			const response = await postApi('stories/recommend', content);
			set({ mood: response.data.mood });
			set({ music: response.data.music });
			set({ phrase: response.data.phrase });
		} catch (error) {
			set({ errMsg: error.response.data.errorMessage });
		}
	},

	handleModalOpen: () => {
		set({ storyModal: true });
		document.body.style.overflow = 'hidden';
	},

	handleModalClose: () => {
		set({ storyModal: false });
		set({ music: '' });
		document.body.style.overflow = 'auto';
	},
	postStory: async (formData) => {
		try {
			await postApi('/stories', formData);

			window.location.href = '/stories';
		} catch (error) {
			set({ errMsg: error.response.data.errorMessage });
		}
	},
}));

export default useStoryStore;
