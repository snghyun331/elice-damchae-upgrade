import { create } from 'zustand';
import { postApi } from '../services/api';

const useUserStore = create((set) => {
	return {
		email: '',
		password: '',
		nickname: '',
		mbti: '',
		isLoggedIn: true,
		errMsg: '',

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
	};
});

export default useUserStore;
