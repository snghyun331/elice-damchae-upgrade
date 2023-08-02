import { useEffect } from 'react';
import banner1 from '/images/thumbnail.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BannerCarousel = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
	});

	return (
		<>
			<div
				data-aos="zoom-out"
				data-aos-delay="5000"
				data-aos-duration="1000"
				className="relative h-56 overflow-hidden rounded-lg md:h-96"
			>
				<img
					src={banner1}
					className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					alt="..."
				/>
			</div>
			<div
				data-aos="flip-right"
				data-aos-delay="5000"
				data-aos-duration="1000"
				className="relative h-56 overflow-hidden rounded-lg md:h-96"
			>
				<img
					src={banner1}
					className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					alt="..."
				/>
			</div>
		</>
	);
};

export default BannerCarousel;
