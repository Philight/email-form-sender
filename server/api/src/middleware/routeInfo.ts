import path from 'path';
import { message, TMessage } from '../utils/logger';

export const routeInfo = ({ MODULE }) => {
  return async (req, res, next) => {
    message('REQUEST | '+MODULE, `${req['method']} ${req['originalUrl']}`, TMessage.INFO); 
    next();
  }
}