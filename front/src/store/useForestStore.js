import { create } from 'zustand';

const useForestStore = create((set) => ({
	title: '',
	content: '',
	mood: '',
	commentList: '',

	setTitle: (title) => set({ title }),
	setContent: (content) => set({ content }),
	setMood: (mood) => set({ mood }),
	setCommentList: (commentList) => set({ commentList }),

	reset: () =>
		set({
			title: '',
			content: '',
			mood: '',
			commentList: '',
		}),
}));

export default useForestStore;
