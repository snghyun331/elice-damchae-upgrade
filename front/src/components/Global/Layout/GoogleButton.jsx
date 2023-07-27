import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import { useUserActions } from '../../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const clientIdData = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleButton = () => {
	const { googleRegister, googleLogin } = useUserActions();
	const navigate = useNavigate();

	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: clientIdData,
				scope: 'email',
			});
		}
		gapi.load('client:auth2', start);
	}, []);

	const onSuccess = async (res) => {
		console.log(res);
		const email = res.wt.cu;
		const idToken = res.tokenId; //사용하지 않을 가상 비밀번호 생성
		const nickname = res.wt.Ad;
		const mbti = '미설정';

		const user = { email, idToken, nickname, mbti, isGoogleLogin: true };

		try {
			await googleRegister(user);
			await googleLogin(user);
			navigate('/');
		} catch (error) {
			console.log(error.response?.data?.errorMessage);
		}
	};

	const onFailure = (res) => {
		console.log(res);
	};

	return (
		<div>
			<GoogleLogin
				clientId={clientIdData}
				onSuccess={onSuccess}
				onFailure={onFailure}
				buttonText="Google 계정으로 로그인 · 회원가입"
				className="w-full flex justify-center items-center"
			/>
		</div>
	);
};

export default GoogleButton;
