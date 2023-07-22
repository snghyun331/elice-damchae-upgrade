import { Schema, model } from 'mongoose';

const storyRandomMusicSchema = new Schema({
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
	storyRandomMusicSchema,
	'storyrandommusic',
);

export { storyRandomMusic };
