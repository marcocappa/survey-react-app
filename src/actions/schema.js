import { schema } from 'normalizr';

const answerSchema = new schema.Entity('answer');
export const answerDataSchema = new schema.Array(answerSchema);