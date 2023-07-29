import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_HOST;

const getToken = () => {
	return localStorage.getItem('accessToken') || undefined;
};

const instance = axios.create({
	baseURL: serverUrl,
});

instance.interceptors.request.use(
	(config) => {
		const accessToken = getToken();

		if (config.data instanceof FormData) {
			console.log('폼데이터');
			config.headers['Content-Type'] = 'multipart/form-data';
		} else if (config.data instanceof Object) {
			console.log('json데이터');
			config.headers['Content-Type'] = 'application/json';
		}
		config.headers['Authorization'] = `Bearer ${accessToken}`;

		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		if (response.status === 404) {
			console.log('404 페이지로 넘어가야 함!');
		}
		return response;
	},
	(error) => {
		console.error(error);
		if (
			error.response.data.message ===
			('토큰이 만료되었습니다' || '토큰이 유효하지 않습니다')
		) {
			localStorage.removeItem('accessToken');
		}
		return Promise.reject(error);
	},
);

export default instance;
