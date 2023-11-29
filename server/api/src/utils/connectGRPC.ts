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

//const PORT = customConfig.port;
const PORT = 9000;
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
  const testEmailBody = {
    'from': 'obd.sf.test01@gmail.com',
    'to': 'lai.filip@gmail.com',
    'cc': ['test01@gmail.com', 'test02@gmail.com', 'test03@gmail.com'],
    'subject': 'subject',
    'body': 'Lorem ipsum..',
    'attachments': '',
  }

  client.SendEmail(testEmailBody, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
  });
/*
  client.SignUpUser(
    {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'password123',
      passwordConfirm: 'password123',
      photo: 'default.png',
    },
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(res);
    }
  );  
*/

});


/********** 
 * gRPC FUNCTIONS
*********/

const signUpUser = async (user) => {
  return await new Promise((resolve, reject) => {
    client.SignUpUser(user, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log(res);
      resolve(res);
    });
  });
}

const verifyEmail = async (verification_code) => {
  return await new Promise((resolve, reject) => {
    client.VerifyEmail({ verification_code }, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log(res);
      resolve(res);
    });
  });
}

const signInUser = async (user) => {
  return await new Promise((resolve, reject) => {
    client.SignInUser(user, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log(res);
      resolve(res);
    });
  });
}

const refreshToken = async (refresh_token) => {
  return await new Promise((resolve, reject) => {
    client.RefreshToken({ refresh_token }, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log(res);
      resolve(res);
    });
  });
}

const getMe = async (user) => {
  return await new Promise((resolve, reject) => {
    client.GetMe(user, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log(res);
      resolve(res);
    });
  });
}

const sendEmail = async (email) => {
  return await new Promise((resolve, reject) => {
    client.SendEmail(email, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      console.log(res);
      resolve(res);
    });
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
