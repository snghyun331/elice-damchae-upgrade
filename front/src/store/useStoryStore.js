import { create } from 'zustand';

const useStoryStore = create((set) => ({
	title: '',
	content: '',
	mood: '',
	music: '',
	phrase: '',
	thumbnail: '',
	localThumbnail: '',
	stableThumbnail: 'thumbnail-1690526042990-912987342.jpg',
	isPublic: false,
	storyModal: false,
	errMsg: '',

	setTitle: (title) => set({ title }),
	setContent: (content) => set({ content }),
	setMood: (mood) => set({ mood }),
	setMusic: (music) => set({ music }),
	setPhrase: (phrase) => set({ phrase }),
	setThumbnail: (thumbnail) => set({ thumbnail }),
	setLocalThumbnail: (localThumbnail) => set({ localThumbnail }),
	setStableThumbnail: (stableThumbnail) => set({ stableThumbnail }),

	reset: () =>
		set({
			title: '',
			content: '',
			mood: '',
			music: '',
			phrase: '',
			thumbnail: '',
			localThumbnail: '',
			stableThumbnail: 'thumbnail-1690526042990-912987342.jpg',
		}),
}));

export default useStoryStore;
