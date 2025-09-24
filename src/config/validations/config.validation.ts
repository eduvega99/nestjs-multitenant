import * as joi from 'joi';

export default joi.object({
  PORT: [joi.number().port(), joi.optional()],
});
