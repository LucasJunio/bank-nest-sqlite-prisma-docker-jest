import * as Joi from 'joi';

export const createAccountValidation = Joi.object({
  custumerId: Joi.number().integer().required().messages({
    'number.base': `custumerId is a number (Float).`,
  }),

  initialCredit: Joi.number().required().messages({
    'number.base': `initialCredit is a number (Float).`,
  }),
});
