import { useEffect } from 'react';
import useUserStore from '../../store/useUserStore';

const getImages = (mbti) =>
	Array(5)
		.fill()
		.map(
			(_, i) =>
				`https://damchae.s3.ap-northeast-2.amazonaws.com/characters/${mbti.toLowerCase()}${
					i + 1
				}.jpg`,
		);

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

const ProfilePicker = () => {
	const { mbti, tempMbtiImg, setTempMbtiImg } =
		useUserStore();
	useEffect(() => {
		if (mbti && typeof profileImg == 'string') {
			setTempMbtiImg(null);
		}
	}, [mbti]);

	const handleProfileClick = (imageURL) => {
		setTempMbtiImg(imageURL);
	};
	if (!mbti) {
		return (
			<div>
				<label
					htmlFor="profile"
					className="block mb-2 font-semibold text-gray-900 dark:text-white"
				>
					프로필 이미지 선택
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
				프로필 이미지 선택
			</label>
			<div className="flex flex-row">
				{profileData[mbti]?.map((image, index) => {
					return (
						<img
							className={`mx-0.5 rounded object-cover ${
								tempMbtiImg === image ? 'border-4 border-blue-500' : ''
							}`}
							style={{ width: '19%' }}
							key={`${mbti}-${index}`}
							src={image}
							alt={`Profile ${mbti}${index + 1}`}
							onClick={() => handleProfileClick(image)} // Pass the image URL to the handler
						/>
					);
				})}
			</div>
			<div></div>
		</div>
	);
};

export default ProfilePicker;
