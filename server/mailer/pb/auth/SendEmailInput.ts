// Original file: proto/services.proto


export interface SendEmailInput {
  'from'?: (string);
  'to'?: (string);
  'cc'?: (string);
  'subject'?: (string);
  'body'?: (string);
  'attachments'?: (string);
  'access_token'?: (string);
}

export interface SendEmailInput__Output {
  'from': (string);
  'to': (string);
  'cc': (string);
  'subject': (string);
  'body': (string);
  'attachments': (string);
  'access_token': (string);
}
