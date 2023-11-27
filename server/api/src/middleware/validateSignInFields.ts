import path from 'path';
import { message, TMessage, printObject } from '../utils/logger';
import Joi from 'joi';

const IS_DEBUG = Boolean(process.env.IS_DEBUG) ?? false;
const MODULE = path.basename(__filename).replace('.js', '');

const validationSchema = Joi.object({

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(3)
    .max(15)
    .required(), 
   
}).options({ abortEarly: false })


export const validateSignInFields = async (req, res, next) => {
  if (IS_DEBUG) message(MODULE, `validateSignInFields |`, TMessage.INFO);
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
    message(MODULE, `validateSignInFields >> `, TMessage.ERROR);
    printObject(response);
    res.statusMessage = TMessage.ERROR;
    res.status(400).json(response);
  } else {
    next();
  }
}