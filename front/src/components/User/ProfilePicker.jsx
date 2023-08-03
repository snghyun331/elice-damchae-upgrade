import { useEffect } from 'react';
import useUserStore from '../../store/useUserStore';

const getImages = (mbti) => {
	const images = [];
	for (let i = 1; i <= 5; i++) {
		const imageURL = `images/characters/${mbti.toLowerCase()}/${mbti.toLowerCase()}${i}.jpg`;
		images.push(imageURL);
	}
	return images;
};

const ProfilePicker = () => {
	const { mbti, profileImg, setProfileImg } = useUserStore();

	const profileData = {
		INFP: getImages('INFP'),
		ENFJ: getImages('ENFJ'),
		INTJ: getImages('INTJ'),
		ENTJ: getImages('ENTJ'),
		INTP: getImages('INTP'),
		ENTP: getImages('ENTP'),
		ISFP: getImages('ISFP'),
		ESFP: getImages('ESFP'),
		ISTP: getImages('ISTP'),
		ESTP: getImages('ESTP'),
		ISFJ: getImages('ISFJ'),
		ESFJ: getImages('ESFJ'),
		ISTJ: getImages('ISTJ'),
		ESTJ: getImages('ESTJ'),
		INFJ: getImages('INFJ'),
		ENFP: getImages('ENFP'),
	};

	useEffect(() => {
		if (mbti) {
			setProfileImg(null); // Reset selected image when MBTI changes
		}
	}, [mbti]);

	const handleProfileClick = (imageURL) => {
		setProfileImg(imageURL);
	};

	if (!mbti) {
		return (
			<div>
				<label
					htmlFor="profile"
					className="block mb-2 font-semibold text-gray-900 dark:text-white"
				>
					프로필 이미지 설정
				</label>
				<div>선택된 MBTI가 없습니다.</div>
			</div>
		);
	}

	return (
		<div>
			<label
				htmlFor="profile"
				className="block mb-2 font-semibold text-gray-900 dark:text-white"
			>
				프로필 이미지 설정
			</label>
			<div className="flex flex-row">
				{profileData[mbti]?.map((image, index) => {
					return (
						<img
							className={`w-1/5 rounded object-cover ${
								profileImg === image ? 'border-4 border-blue-500' : ''
							}`}
							key={`${mbti}-${index}`}
							src={image}
							alt={`Profile ${mbti}-${index + 1}`}
							onClick={() => handleProfileClick(image)} // Pass the image URL to the handler
						/>
					);
				})}
			</div>
			<div>
				{profileImg && ( // Only display if a selected image exists
					<div className="mt-5">
						<img
							className="border-4 border-neutral-300 w-36 h-36 rounded-full object-cover"
							src={profileImg}
							alt={`Selected Profile`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePicker;
