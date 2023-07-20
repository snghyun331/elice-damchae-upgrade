import { create } from 'zustand';

const useLoginStore = create((set) => ({
	user: {
		email: '',
		password: '',
	},
	isEmailFocused: false,
	isPasswordFocused: false,
	setEmail: (email) => set((state) => ({ user: { ...state.user, email } })),
	setPassword: (password) =>
		set((state) => ({ user: { ...state.user, password } })),
	setIsEmailFocused: (isEmailFocused) => set({ isEmailFocused }),
	setIsPasswordFocused: (isPasswordFocused) => set({ isPasswordFocused }),
	isLoggedIn: false,
	setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	errMsg: '',
	setErrMsg: (message) => set({ errMsg: message }),
}));

export default useLoginStore;
