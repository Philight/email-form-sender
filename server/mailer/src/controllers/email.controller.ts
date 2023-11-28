import * as grpc from '@grpc/grpc-js';
import { SendEmailInput__Output } from '../../pb/auth/SendEmailInput';
import { GenericResponse } from '../../pb/auth/GenericResponse';
import { deserializeUser } from '../middleware/deserializeUser';
import Email from '../utils/email';

export const sendEmailHandler = async (
  req: grpc.ServerUnaryCall<SendEmailInput__Output, GenericResponse>,
  res: grpc.sendUnaryData<GenericResponse>
) => {
  try {

    console.log('MAILER | sendEmailHandler req', req.request);
    const user = await deserializeUser(req.request.access_token);
    console.log('MAILER | sendEmailHandler user', user);
    if (!user) {
      res({
        code: grpc.status.NOT_FOUND,
        message: 'Invalid access token or session expired',
      });
      return;
    }

    const emailFields = { 
      email: {
        ...req.request, 
        from: user.email,
      },
      user,
    }

    await new Email(emailFields).sendEmail(req.request.subject);
    res(null, { status: 'success', message: `Email to ${req.request.to} sent.` });

  } catch (err: any) {
    res({
      code: grpc.status.INTERNAL,
      message: err.message,
    });
  }
};
