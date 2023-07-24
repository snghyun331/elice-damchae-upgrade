import { create } from 'zustand';
import { postApi } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Add this line

const useUserStore = create((set) => {
	const navigate = useNavigate(); // Get the navigate function using useNavigate

	return {
		email: '',
		password: '',
		nickname: '',
		mbti: '',
		isLoggedIn: true,
		errMsg: '',

		// Rest of your setters...

		login: async (user) => {
			try {
				const response = await postApi('auth/login', user);

				const jwtToken = response.data.token;

				localStorage.setItem('accessToken', jwtToken);
				set({ isLoggedIn: true });
				navigate('/');
			} catch (error) {
				set({ errMsg: error.response.data.errorMessage });
			}
		},

		register: async (user) => {
			try {
				await postApi('auth/register', user);
				console.log(user);
				navigate('/login');
			} catch (error) {
				set({ errMsg: error.response.data.errorMessage });
			}
		},

		logout: () => {
			localStorage.removeItem('accessToken');
			set({ isLoggedIn: false });
			navigate('/'); // Navigate to the home page after logging out
		},
	};
});

export default useUserStore;
