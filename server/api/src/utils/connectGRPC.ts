import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType } from '../../../mailer/src/pb/services';
import customConfig from '../../../mailer/src/config/default';

const options: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PORT = customConfig.port;
const PROTO_FILE = '../../../mailer/proto/services.proto';
const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  options
);

const proto = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const client = new proto.auth.AuthService(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});


const verifyEmail = () => {
  const testEmailBody = {
    'from': 'obd.sf.test01@gmail.com',
    'to': 'lai.filip@gmail.com',
    'cc': ['test01@gmail.com', 'test02@gmail.com', 'test03@gmail.com'],
    'subject': 'subject',
    'body': 'Lorem ipsum..',
    'attachments': '',
  }

  client.sendEmail(testEmailBody, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
  });
}

const sendEmail = (emailBody) => {
  client.sendEmail(emailBody, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
    return res;
  });
}

export {
  client as mailerClient,
  verifyEmail as mailerVerify,
  sendEmail as mailerSend,
}
