import { create } from 'zustand';

const useStoryGlobalStore = create((set) => ({
	title: '',
	content: '',
	mood: '',
	music: '',
	phrase: '',
	setTitle: (title) => set({ title }),
	setContent: (content) => set({ content }),
	setMood: (mood) => set({ mood }),
	setMusic: (music) => set({ music }),
	setPhrase: (phrase) => set({ phrase }),
}));

export default useStoryGlobalStore;
