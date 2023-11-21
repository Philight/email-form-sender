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


/********** 
 * gRPC FUNCTIONS
*********/

const signUpUser = (user) => {
  client.signUpUser(user, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
    return res;
  });
}

const verifyEmail = () => {
  client.verifyEmail(null, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
  });
}

const signInUser = (user) => {
  client.signInUser(user, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
    return res;
  });
}

const refreshToken = (refreshToken) => {
  client.refreshToken({ refresh_token: refreshToken }, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
    return res;
  });
}

const getMe = (user) => {
  client.getMe(user, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
    return res;
  });
}

const sendEmail = (email) => {
  client.sendEmail(email, (err, res) => {
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
  signUpUser as mailerSignUp,
  verifyEmail as mailerVerify,
  signInUser as mailerSignIn,
  refreshToken as mailerRefreshToken,
  getMe as mailerGetMe,
  sendEmail as mailerSend,
}
