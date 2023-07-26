const Footer = () => {
	return (
		<>
			<footer className="bg-blue-400 dark:bg-gray-900">
				<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
					<div className="sm:flex sm:items-center sm:justify-between">
						<a
							className="flex items-center mb-4 sm:mb-0"
						>
							<span className="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
								Damchae
							</span>
						</a>
						<span className="text-white text-sm text-gray-500 sm:text-center dark:text-gray-400">
							© 2023{' '}
								Flowbite™
							. All Rights Reserved.
						</span>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
