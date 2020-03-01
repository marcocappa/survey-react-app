import { schema } from 'normalizr';

const questionSchema = new schema.Entity('questions');
export const surveyDataSchema = new schema.Array(questionSchema);
