import { useEffect } from 'react';
import { useUserActions } from '@/store/useUserStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleButton = () => {
	const { googleLogin } = useUserActions();
	const navigate = useNavigate();

	useEffect(() => {
		window.google.accounts.id.initialize({
			client_id: clientId,
			callback: handleOnSignIn,
			auto_prompt: false,
		});

		window.google.accounts.id.renderButton(
			document.getElementById('google-signin-button'),
			{
				type: 'standard',
				size: 'large',
				theme: 'outline',
				text: 'sign_in_with',
				shape: 'rectangular',
				logo_alignment: 'left',
			},
		);

		return () => {
			window.google.accounts.id.cancel();
		};
	}, []);

	const decode = (token) => {
		try {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace('-', '+').replace('_', '/');
			return JSON.parse(window.atob(base64));
		} catch (error) {
			console.error('Failed to decode JWT token:', error);
			return null;
		}
	};

	const handleOnSignIn = async (response) => {
		const responsePayload = decode(response.credential);

		if (response) {
			const email = responsePayload.email;
			const idToken = response.credential;
			const nickname = responsePayload.given_name;
			const mbti = '미설정';

			const user = { email, idToken, nickname, mbti, isGoogleLogin: true };

			try {
				await googleLogin(user);
				navigate('/');
			} catch (error) {
				toast.error('구글 로그인에 실패했습니다.');
				console.log(error.response?.data?.errorMessage);
			}
		}
	};

	return <div id="google-signin-button"></div>;
};

export default GoogleButton;
