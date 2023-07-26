import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = import.meta.env.GOOGLE_CLIENT_ID;

const GoogleLoginButton = () => {
	const clientId = googleClientId ? googleClientId : '';
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
