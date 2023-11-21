import path from 'path';
import { message, TMessage, printObject } from '../utils/logger';
import Joi from 'joi';

const IS_DEBUG = Boolean(process.env.IS_DEBUG) ?? false;
const MODULE = path.basename(__filename).replace('.js', '');

const validationSchema = Joi.object({

  name: Joi.string()
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(3)
    .max(15)
    .required(), 

  passwordConfirm: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .options({ language: { any: { allowOnly: 'must match password' } } }),

  photo: Joi.string()
    .uri(),
   
}).options({ abortEarly: false })


export const validateUserFields = async (req, res, next) => {
  if (IS_DEBUG) message(MODULE, `validateUserFields |`, TMessage.INFO);
console.log(req.body);
  const { error: validationErrors } = validationSchema.validate(req.body);
  if (validationErrors) { 
    const response = {
      error: 'Validation error',
      fields: {},
    };
    for (const field of validationErrors.details) {
      response.fields[field.context.key] = field.message;
    }
    message(MODULE, `validateUserFields >> `, TMessage.ERROR);
    printObject(response);
    res.statusMessage = TMessage.ERROR;
    res.status(400).json(response);
  } else {
    next();
  }
}