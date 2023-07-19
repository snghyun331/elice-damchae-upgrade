import Router from './routes/Router';

import { useLocation } from 'react-router-dom';

import Layout from './components/Global/Layout/Layout';

const App = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const shouldRenderMarginTop = !['/login', '/register'].includes(currentPath);

	return (
		<div className="h-screen">
			<Layout>
				<div
					className={
						shouldRenderMarginTop
							? 'mt-10 mb-20 mx-4 sm:mx-10 md:mx-20 lg:mx-40'
							: ''
					}
				>
					<Router />
				</div>
			</Layout>
		</div>
	);
};

export default App;
