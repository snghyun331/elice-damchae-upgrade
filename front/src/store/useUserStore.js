import { create } from 'zustand';
import { postApi } from '../services/api';

const useUserStore = create((set, get) => ({
	id: '',
	email: '',
	nickname: '',
	mbti: '',
	profileImg: '',
	isLoggedIn: Boolean(localStorage.getItem('accessToken')),

	setEmail: (email) => set({ email }),
	setNickname: (nickname) => set({ nickname }),
	setMbti: (mbti) => set({ mbti }),
	setProfileImg: (profileImg) => set({ profileImg }),
	setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

	actions: {
		login: async (user) => {
			const response = await postApi('auth/login', user);
			console.log(response.data);
			const jwtToken = response.data.token;
			localStorage.setItem('accessToken', jwtToken);

			set({
				isLoggedIn: true,
				id: response.data.id,
				email: response.data.email,
				nickname: response.data.nickname,
				mbti: response.data.mbti,
			});
			console.log('로그인 완료 후 설정된 전역변수 :', get());
		},

		register: async (user) => {
			console.log(user)
			await postApi('auth/register', user);
		},

		logout: () => {
			localStorage.removeItem('accessToken');
			set({ isLoggedIn: false });
			alert('로그아웃 하였습니다.');
		},
	},
}));

export const useUserActions = () => useUserStore((state) => state.actions);

export default useUserStore;
