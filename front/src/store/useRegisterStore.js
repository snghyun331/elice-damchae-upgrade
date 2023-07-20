import { create } from 'zustand';

const useRegisterStore = create((set) => ({
	user: {
		email: '',
		password: '',
		nickname: '',
		mbti: null,
	},
	confirmPassword: '',
	code: '',
	isEmailFocused: false,
	isPasswordFocused: false,
	isNicknameFocused: false,
	isConfirmFocused: false,
	isCodeFocused: false,
	setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
	setPassword: (password) =>
		set((state) => ({ user: { ...state.user, password } })),
	setNickname: (nickname) =>
		set((state) => ({ user: { ...state.user, nickname } })),
	setMBTI: (mbti) => set((state) => ({ user: { ...state.user, mbti } })),
	setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
	setCode: (code) => set({ code }),
	setIsEmailFocused: (isEmailFocused) => set({ isEmailFocused }),
	setIsPasswordFocused: (isPasswordFocused) => set({ isPasswordFocused }),
	setIsNicknameFocused: (isNicknameFocused) => set({ isNicknameFocused }),
	setIsConfirmFocused: (isConfirmFocused) => set({ isConfirmFocused }),
	setIsCodeFocused: (isCodeFocused) => set({ isCodeFocused }),
}));

export default useRegisterStore;
