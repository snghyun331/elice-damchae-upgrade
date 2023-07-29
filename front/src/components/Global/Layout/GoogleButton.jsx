import GoogleLogin from 'react-google-login';
import { useUserActions } from '../../../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const clientIdData = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleButton = () => {
	const { googleRegister, googleLogin } = useUserActions();
	const navigate = useNavigate();

	const onSuccess = async (res) => {
		console.log(res);
		const email = res.wt.cu;
		const idToken = res.tokenId; //사용하지 않을 가상 비밀번호 생성
		const nickname = res.wt.Ad;
		const mbti = '미설정';

		const user = { email, idToken, nickname, mbti, isGoogleLogin: true };

		try {
			// TODO : googleRegister 요청 한번만 보내고, 백에서 회원가입과 로그인 동시에 수행하도록 수정
			// TODO : GoogleLogin 라이브러리 사용하지 않도록 수정
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

			<div
				id="g_id_onload"
				data-client_id={clientIdData}
				data-login_uri="http://localhost:5173"
				data-auto_prompt="false"
			></div>
			<div
				className="g_id_signin"
				data-type="standard"
				data-size="large"
				data-theme="outline"
				data-text="sign_in_with"
				data-shape="rectangular"
				data-logo_alignment="left"
			></div>
		</div>
	);
};

export default GoogleButton;
