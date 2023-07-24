import { create } from 'zustand';
import { postApi } from '../services/api';

const useUserStore = create((set) => ({
	email: '',
	password: '',
	nickname: '',
	mbti: '',
	isLoggedIn: true,
	errMsg: '',

	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),
	setNickname: (nickname) => set({ nickname }),
	setMbti: (mbti) => set({ mbti }),
	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
	setErrMsg: (errMsg) => set({ errMsg }),

	actions: {
		login: async (user) => {
			try {
				const response = await postApi('auth/login', user);

				const jwtToken = response.data.token;

				localStorage.setItem('accessToken', jwtToken);
				set({ isLoggedIn: true });
			} catch (error) {
				set({ errMsg: error.response.data.errorMessage });
			}
		},

		register: async (user) => {
			try {
				await postApi('auth/register', user);
				console.log(user);
			} catch (error) {
				set({ errMsg: error.response.data.errorMessage });
			}
		},
		logout: () => {
			localStorage.removeItem('accessToken');
			set({ isLoggedIn: false });
		},
	},
}));

export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;
