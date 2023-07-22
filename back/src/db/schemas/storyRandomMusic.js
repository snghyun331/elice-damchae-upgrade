import { Schema, model } from 'mongoose';

const storyRandomMusicShema = new Schema({
	mood: {
		type: String,
		enum: ['pleasure', 'sad', 'insecure', 'anger'],
		required: true,
	},
	music: {
		type: String,
		required: true,
	},
});

const storyRandomMusic = model(
	'StoryRandomMusic',
	storyRandomMusicShema,
	'storyrandommusic',
);

export { storyRandomMusic };
