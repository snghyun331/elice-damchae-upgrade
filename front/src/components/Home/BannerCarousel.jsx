import banner1 from '/images/story.gif';
import banner2 from '/images/forest.gif';
import bannermain from '/images/bannermain.jpg';

const BannerCarousel = () => {
	return (
		<>
			<div
				data-aos="flip-left"
				className="relative h-56 overflow-hidden rounded-lg md:h-[600px]"
			>
				<img
					src={bannermain}
					className="object-cover absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					alt="..."
				/>
			</div>
			{/* <div
				data-aos="flip-left"
				className="relative h-56 overflow-hidden rounded-lg md:h-96"
			>
				<img
					src={banner1}
					className="object-none absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					alt="..."
				/>
			</div>
			<div
				data-aos="flip-left"
				className="relative h-56 overflow-hidden rounded-lg md:h-96"
			>
				<img
					src={banner2}
					className="object-none absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					alt="..."
				/>
			</div> */}
		</>
	);
};

export default BannerCarousel;
