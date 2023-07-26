import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientIdData = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton = () => {
	const clientId = clientIdData ? clientIdData : '';
	return (
		<>
			<GoogleOAuthProvider clientId={clientId}>
				<GoogleLogin
					onSuccess={(res) => {
						console.log(res);
					}}
					onFailure={(err) => {
						console.log(err);
					}}
				/>
			</GoogleOAuthProvider>
		</>
	);
};

export default GoogleLoginButton;
