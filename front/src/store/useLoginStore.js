import { create } from 'zustand';

const useLoginStore = create((set) => ({
	email: '',
	password: '',
	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),
	isLoggedIn: false,
	errMsg: '',
	setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	setErrMsg: (message) => set({ errMsg: message }),
	isEmailFocused: false,
	isPasswordFocused: false,
	setIsEmailFocused: (isEmailFocused) => set({ isEmailFocused }),
	setIsPasswordFocused: (isPasswordFocused) => set({ isPasswordFocused }),
}));

export default useLoginStore;
