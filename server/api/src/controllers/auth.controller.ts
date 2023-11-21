import path from 'path';

import { 
  mailerClient, 
  mailerSignUp, 
  mailerSignIn,
  mailerSend,
} from '../utils/connectGRPC';
import { message, TMessage, printObject } from '../utils/logger';

const MODULE = path.basename(__filename).replace('.js', '');
const IS_DEBUG = Boolean(process.env.IS_DEBUG) ?? false;
const PORT = parseInt(process.env.PORT, 10) || 80;
const HOSTNAME = process.env.HOSTNAME;

exports.signUp = async (req, res, next) => {
  try {
    if (IS_DEBUG) message(MODULE, `signUp |`, TMessage.INFO);

    printObject(req.body);

console.log('CLIENT REQ | signUp body');
console.log(req.body);
    const response = mailerSignUp(req.body);
console.log('CLIENT REQ | signUp response');
console.log(response);

    res.statusMessage = TMessage.SUCCESS;
    res.status(200).json(await response);

  } catch (err) {
    message(MODULE, `signUp >> `+err + (err&&err.stack), TMessage.ERROR);
    res.statusMessage = TMessage.ERROR;
    res.status(500).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    if (IS_DEBUG) message(MODULE, `verifyEmail |`, TMessage.INFO);

    printObject(req.body);

console.log('CLIENT REQ | verifyEmail body');
console.log(req.body);
    const response = mailerSend(req.body);
console.log('CLIENT REQ | verifyEmail response');
console.log(response);

/*
    const response = got({
      url: `http://${HOSTNAME}:${PORT}${ROUTES['DATABASE']['ADS']}`,
      method: 'POST',
      json: req.body
    }).json();
*/
    res.statusMessage = TMessage.SUCCESS;
    res.status(200).json(await response);

  } catch (err) {
    message(MODULE, `verifyEmail >> `+err + (err&&err.stack), TMessage.ERROR);
    res.statusMessage = TMessage.ERROR;
    res.status(500).json({ error: err.message });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    if (IS_DEBUG) message(MODULE, `signIn |`, TMessage.INFO);

    printObject(req.body);

console.log('CLIENT REQ | signIn body');
console.log(req.body);
    const response = mailerSignIn(req.body);
console.log('CLIENT REQ | signIn response');
console.log(response);

    res.statusMessage = TMessage.SUCCESS;
    res.status(200).json(await response);

  } catch (err) {
    message(MODULE, `signIn >> `+err + (err&&err.stack), TMessage.ERROR);
    res.statusMessage = TMessage.ERROR;
    res.status(500).json({ error: err.message });
  }
};