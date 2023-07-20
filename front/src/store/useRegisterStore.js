import { create } from 'zustand';
import useLoginStore from './useLoginStore';

const useRegisterStore = create((set) => ({
	...useLoginStore(),
	nickname: '',
	mbti: '',
	setNickname: (nickname) => set({ nickname }),
	setMbti: (mbti) => set({ mbti }),

	confirmPassword: '',
	isNicknameFocused: false,
	isConfirmFocused: false,
	code: '',
	isCodeFocused: false,

	setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
	setIsNicknameFocused: (isNicknameFocused) => set({ isNicknameFocused }),
	setIsConfirmFocused: (isConfirmFocused) => set({ isConfirmFocused }),
	setCode: (Code) => set({ Code }),
	setIsCodeFocused: (isCodeFocused) => set({ isCodeFocused }),
}));

export default useRegisterStore;
