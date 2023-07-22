import { create } from 'zustand';
import { postApi } from '../services/api';

const useUserStore = create((set) => ({
	email: '',
	password: '',
	nickname: '',
	mbti: '',
	isLoggedIn: false,
	errMsg: '',

	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),
	setNickname: (nickname) => set({ nickname }),
	setMbti: (mbti) => set({ mbti }),
	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	setErrMsg: (errMsg) => set({ errMsg }),

	login: async (user) => {
		try {
			const response = await postApi('auth/login', user);

			const jwtToken = response.data.token;

			localStorage.setItem('accessToken', jwtToken);
			set({ isLoggedIn: true });

			window.location.href = '/';
		} catch (error) {
			set({ errMsg: error.response.data.errorMessage });
		}
	},

	register: async (user) => {
		try {
			await postApi('auth/register', user);
			console.log(user);
			window.location.href = '/login';
		} catch (error) {
			set({ errMsg: error.response.data.errorMessage });
		}
	},
	logout: () => {
		localStorage.removeItem('accessToken');
		set({ isLoggedIn: false });
		window.location.href = '/';
	},
}));

export default useUserStore;
