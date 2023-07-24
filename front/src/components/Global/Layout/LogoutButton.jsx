import useUserStore from '../../../store/useUserStore';

const LogoutButton = () => {
	const { logout } = useUserStore();

	return (
		<button
			onClick={() => {
				logout();
			}}
			type="button"
			className="whitespace-nowrap hidden md:block text-white shadow-inner bg-[#A06763] hover:bg-[#A36560] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-4 py-2 pt-3 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
			style={{
				boxShadow: '2px 2px 1px 1px rgba(0, 0, 0, 0.1)',
			}}
		>
			로그아웃
		</button>
	);
};

export default LogoutButton;
