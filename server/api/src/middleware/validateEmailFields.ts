import path from 'path';
import { message, TMessage, printObject } from '../utils/logger';
import Joi from 'joi';

const IS_DEBUG = Boolean(process.env.IS_DEBUG) ?? false;
const MODULE = path.basename(__filename).replace('.js', '');

const validationSchema = Joi.object({
  to: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  cc: Joi.string(),

  subject: Joi.string()
    .min(5)
    .required(), 

  body: Joi.string()
    .min(10)
    .required(), 

  attachments: Joi.array()
    .items(Joi.string()
      .uri()
    ),    
}).options({ abortEarly: false, allowUnknown: true })


export const validateEmailFields = async (req, res, next) => {
  if (IS_DEBUG) message(MODULE, `validateEmailFields |`, TMessage.INFO);
console.log('validateEmailFields body');
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
    message(MODULE, `validateEmailFields >> `, TMessage.ERROR);
    printObject(response);
    res.statusMessage = TMessage.ERROR;
    res.status(400).json(response);
  } else {
    next();
  }
}