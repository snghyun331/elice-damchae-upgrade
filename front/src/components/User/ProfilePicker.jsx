import { useState } from 'react';

const ProfilePicker = () => {
	const [selectedProfile, setSelectedProfile] = useState(null);

	const profileData = [
		{
			id: 1,
			url: 'images/disney/cinderella.jpeg',
		},
		{
			id: 2,
			url: 'images/disney/ariel.jpeg',
		},
		{
			id: 3,
			url: 'images/disney/aurora.jpeg',
		},
		{
			id: 4,
			url: 'images/disney/belle.jpeg',
		},
		{
			id: 5,
			url: 'images/disney/cinderella.jpeg',
		},
	];

	const handleProfileClick = (profileId) => {
		const selected = profileData.find((profile) => profile.id === profileId);
		setSelectedProfile(selected);
	};

	return (
		<div>
			<h1>Profile Picker</h1>
			<div className="flex flex-row">
				{profileData.map((profile) => (
					<img
						className="w-1/5 rounded object-cover"
						key={profile.id}
						src={profile.url}
						alt={`Profile ${profile.id}`}
						onClick={() => handleProfileClick(profile.id)}
						style={{
							border:
								selectedProfile?.id === profile.id ? '2px solid blue' : 'none',
						}}
					/>
				))}
			</div>
			<div>
				{selectedProfile && (
					<div>
						<h2>Selected Profile</h2>
						<img
							className="w-36 h-36 rounded-full object-cover"
							src={selectedProfile.url}
							alt={`Selected Profile ${selectedProfile.id}`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePicker;
