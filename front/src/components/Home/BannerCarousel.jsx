import banner1 from '/images/thumbnail.jpg';

const BannerCarousel = () => {
	return (
		<>
			<div
				data-aos="flip-left"
				className="mb-16 relative h-56 overflow-hidden rounded-lg md:h-[500px]"
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
