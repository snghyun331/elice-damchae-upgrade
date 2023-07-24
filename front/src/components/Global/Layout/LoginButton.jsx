import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => navigate('/login')}
			type="button"
			className="whitespace-nowrap hidden md:block text-white shadow-inner bg-blue-500 hover:bg-neutral-500 focus:ring-4 focus:outline-none focus:ring-[#9BB1BB] font-medium rounded-lg text-lg px-4 py-2 pt-3 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			style={{
				boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.1)',
			}}
		>
			로그인
		</button>
	);
};

export default LoginButton;
