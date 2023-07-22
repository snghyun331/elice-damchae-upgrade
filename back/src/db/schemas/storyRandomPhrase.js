import { Schema, model } from 'mongoose';

const storyRandomPhraseSchema = new Schema({
	mood: {
		type: String,
		// enum: ['pleasure', 'sad', 'insecure', 'anger'],
		required: true,
	},
	phrase: {
		type: String,
		required: true,
	},
});

const storyRandomPhrase = model(
	'StoryRandomPhrase',
	storyRandomPhraseSchema,
	'storyrandomphrase',
);

export { storyRandomPhrase };
