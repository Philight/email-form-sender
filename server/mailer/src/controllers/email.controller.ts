import * as grpc from '@grpc/grpc-js';
import { SendEmailInput__Output } from '../../pb/auth/SendEmailInput';
import { GenericResponse } from '../../pb/auth/GenericResponse';
import Email from '../utils/email';

export const sendEmailHandler = async (
  req: grpc.ServerUnaryCall<SendEmailInput__Output, GenericResponse>,
  res: grpc.sendUnaryData<GenericResponse>
) => {
  try {

console.log('email.controller | req.request')
console.log(req.request)
    await new Email({ email: req.request }).sendEmail(req.request.subject);
    res(null, { status: 'success', message: `Email to ${req.request.to} sent.` });

  } catch (err: any) {
    res({
      code: grpc.status.INTERNAL,
      message: err.message,
    });
  }
};
