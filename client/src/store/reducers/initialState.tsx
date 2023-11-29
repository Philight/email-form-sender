import {
  signInSchema,
  signUpSchema,
  recipientsSchema,
  bodySchema,
} from '@store/validations/schemas';

export interface IStateType {
  pageData: {
    [key: string]: string;
  };
  formData: {
    [key: string]: string | string[];
  };
  formStage: 'landing' | 'signin' | 'signup' | 'recipients' | 'body' | 'pictures' | 'summary';
  imageKitTokens: unknown;
  user: unknown;
}

const RECIPIENTS_FIELDS = {
  subject: {
    label: 'Subject',
    required: true,
    type: 'text',
  },
  to: {
    label: 'Recipient',
    required: true,
    type: 'text',
  },
  cc: {
    label: 'Cc',
    required: false,
    type: 'text',
  },
};

const BODY_FIELDS = {
  body: {
    label: 'Email Content',
    required: true,
    type: 'textarea',
  },
};

const UPLOADED_FIELDS = {
  upload: {
    label: 'Upload',
    required: false,
    type: 'upload',
  },
};

const ATTACHMENTS_FIELDS = {
  attachments: {
    label: 'Attachments',
    required: false,
    type: 'attachments',
  },
};

export const initialState: IStateType = {
  pageData: {
    landing: {
      heading: 'Email Sender',
      subheading: 'Sign in to send emails',
      validations: null,
    },
    signin: {
      heading: 'Sign In',
      subheading: 'Log in with your email address',
      fields: {
        email: {
          label: 'Email',
          required: true,
          type: 'text',
        },
        password: {
          label: 'Password',
          required: true,
          type: 'password',
        },
      },
      validations: signInSchema,
    },
    signup: {
      heading: 'Sign Up',
      subheading: 'Fill in your user credentials',
      fields: {
        name: {
          label: 'Name',
          required: true,
          type: 'text',
        },
        email: {
          label: 'Email',
          required: true,
          type: 'text',
        },
        password: {
          label: 'Password',
          required: true,
          type: 'password',
        },
        passwordConfirm: {
          label: 'Confirm Password',
          required: true,
          type: 'password',
        },
        photo: {
          label: 'Profile Photo',
          required: false,
          type: 'text',
        },
      },
      validations: signUpSchema,
    },
    recipients: {
      heading: 'Recipients',
      subheading: 'Fill recipient email addresses',
      fields: {
        ...RECIPIENTS_FIELDS,
      },
      validations: recipientsSchema,
    },
    body: {
      heading: 'Body',
      subheading: 'Fill email text',
      fields: {
        ...BODY_FIELDS,
      },
      validations: bodySchema,
    },
    attachments: {
      heading: 'Attachments',
      subheading: 'Add signature and pictures',
      fields: {
        ...UPLOADED_FIELDS,
        ...ATTACHMENTS_FIELDS,
      },
    },
    summary: {
      heading: 'Summary',
      subheading: 'Email summary',
      fields: {
        ...RECIPIENTS_FIELDS,
        ...BODY_FIELDS,
        ...ATTACHMENTS_FIELDS,
      },
    },
  },
  formData: {},
  formStage: 'landing',
  imageKitTokens: {},
  user: {},
};
