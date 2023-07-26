import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
const clientIdData = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleButton = () => {
	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: clientIdData,
				scope: 'email',
			});
		}
		gapi.load('client:auth2', start);
	}, []);

	const onSuccess = (res) => {
		console.log(res);
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
			/>{' '}
		</div>
	);
};

export default GoogleButton;
