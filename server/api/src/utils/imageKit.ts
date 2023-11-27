import path from 'path';
var ImageKit = require("imagekit");
var fs = require('fs');

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string
});

/********** 
 * FUNCTIONS
*********/

const getImageKitAuthParams = () => {
  return imagekit.getAuthenticationParameters();
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




export {
  imagekit,
  getImageKitAuthParams,
  verifyEmail as mailerVerify,
}
