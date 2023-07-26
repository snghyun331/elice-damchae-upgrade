import { GoogleLogin } from 'react-google-login';

const clientIdData = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function GoogleLoginButton() {
	const onSuccess = (response) => {
		console.log('[Login Success] Current User:', response);
	};

	const onFailure = (error) => {
		console.log('[Login Failed] Error:', error);
	};

	return (
		<GoogleLogin
			clientId={clientIdData}
			onSuccess={onSuccess}
			onFailure={onFailure}
			buttonText="구글 로그인"
			cookiePolicy={'single_host_origin'}
		/>
	);
}

export default GoogleLoginButton;
