import { create } from 'zustand';

const useStoryGlobalStore = create((set) => ({
	title: '',
	content: '',
	mood: '',
	music: '',
	phrase: '',
	thumnail: '',

	setTitle: (title) => set({ title }),
	setContent: (content) => set({ content }),
	setThumnail: (thumnail) => set({ thumnail }),
	setMood: (mood) => set({ mood }),
	setMusic: (music) => set({ music }),
	setPhrase: (phrase) => set({ phrase }),
}));

export default useStoryGlobalStore;
