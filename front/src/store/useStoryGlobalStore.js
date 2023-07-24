import { create } from 'zustand';

const useStoryGlobalStore = create((set) => ({
	content: '',
	mood: '',
	music: '',
	phrase: '',
	setContent: (content) => set({ content }),
	setMood: (mood) => set({ mood }),
	setMusic: (music) => set({ music }),
	setPhrase: (phrase) => set({ phrase }),
}));

export default useStoryGlobalStore;
