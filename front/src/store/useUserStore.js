import { create } from 'zustand';
import { postApi } from '../services/api';

const useUserStore = create((set) => ({
	email: 'default@email.com',
	nickname: '기본닉네임',
	mbti: 'INTJ',
	profileImg: '',
	isLoggedIn: true,

	setEmail: (email) => set({ email }),
	setNickname: (nickname) => set({ nickname }),
	setMbti: (mbti) => set({ mbti }),
	setProfileImg: (profileImg) => set({ profileImg }),
	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

	actions: {
		login: async (user) => {
			const response = await postApi('auth/login', user);

			const jwtToken = response.data.token;

			localStorage.setItem('accessToken', jwtToken);
			set({ isLoggedIn: true });
		},

		register: async (user) => {
			await postApi('auth/register', user);
		},
		logout: () => {
			localStorage.removeItem('accessToken');
			set({ isLoggedIn: false });
		},
	},
}));

export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;
