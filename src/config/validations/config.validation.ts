import * as joi from 'joi';

const requiredString = joi.string().min(1).required();

export default joi.object({
  PORT: [joi.number().port(), joi.optional()],
  DB_HOST: requiredString.hostname(),
  DB_NAME: requiredString,
  DB_USERNAME: requiredString,
  DB_PASSWORD: requiredString,
});
