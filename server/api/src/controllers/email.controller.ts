import path from 'path';

import { mailerClient, mailerSend } from '../utils/connectGRPC';
import { message, TMessage, printObject } from '../utils/logger';

const MODULE = path.basename(__filename).replace('.js', '');
const PORT = parseInt(process.env.PORT, 10) || 80;
const HOSTNAME = process.env.HOSTNAME;
const IS_DEBUG = Boolean(process.env.IS_DEBUG) ?? false;

exports.sendEmail = async (req, res, next) => {
  try {
    if (IS_DEBUG) message(MODULE, `sendEmail |`, TMessage.INFO);

    printObject(req.body);

    const response = mailerSend(req.body);
console.log('API | sendEmail response');
console.log(response);

    res.statusMessage = TMessage.SUCCESS;
    res.status(200).json(await response);

  } catch (err) {
    message(MODULE, `sendEmail >> `+err + (err&&err.stack), TMessage.ERROR);
    res.statusMessage = TMessage.ERROR;
    res.status(500).json({ error: err.message });
  }
};

