import { create } from 'zustand';

const useStoryStore = create((set) => ({
	title: '',
	content: '',
	selectedImageURL: null,
	isPublic: false,

	setTitle: (title) => set({ title }),
	setContent: (content) => set({ content }),
	setSelectedImageURL: (url) => set({ selectedImageURL: url }),
	setIsPublic: (isPublic) => set({ isPublic }),
}));

export default useStoryStore;
