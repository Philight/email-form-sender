import path from 'path';

import { getImageKitAuthParams } from '../utils/imageKit';
import { 
  mailerClient, 
  mailerSignUp, 
  mailerVerify,
  mailerSignIn,
  mailerSend,
} from '../utils/connectGRPC';
import { message, TMessage, printObject } from '../utils/logger';

const MODULE = path.basename(__filename).replace('.js', '');
const IS_DEBUG = Boolean(process.env.IS_DEBUG) ?? false;
const PORT = parseInt(process.env.PORT, 10) || 80;
const HOSTNAME = process.env.HOSTNAME;


exports.getImageKitAuth = async (req, res, next) => {
  try {
    if (IS_DEBUG) message(MODULE, `getImageKitAuth |`, TMessage.INFO);

    const response = await getImageKitAuthParams();
console.log('req | getImageKitAuth response');
console.log(response);

    res.statusMessage = TMessage.SUCCESS;
    res.status(200).json(await response);

  } catch (err) {
    message(MODULE, `signUp >> `+err + (err&&err.stack), TMessage.ERROR);
    res.statusMessage = TMessage.ERROR;
    res.status(500).json({ error: err.message });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    if (IS_DEBUG) message(MODULE, `signUp |`, TMessage.INFO);

    printObject(req.body);

    const response = await mailerSignUp(req.body);
console.log('req response');
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

    printObject(req.query);

    const response = await mailerVerify(req.query.code);
console.log('req response');
console.log(response);

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

    const response = await mailerSignIn(req.body);
console.log('req response');
console.log(response);

    res.statusMessage = TMessage.SUCCESS;
    res.status(200).json(await response);

  } catch (err) {
    message(MODULE, `signIn >> `+err + (err&&err.stack), TMessage.ERROR);
    res.statusMessage = TMessage.ERROR;
    res.status(500).json({ error: err.message });
  }
};