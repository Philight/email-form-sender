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
  formStage:
    | 'landing'
    | 'signin'
    | 'signup'
    | 'recipients'
    | 'body'
    | 'pictures'
    | 'summary'
    | 'send';
  //  formStage: number;
}

export const initialState: IStateType = {
  pageData: {
    landing: {
      heading: 'Email Sender',
      subheading: 'Sign in to send emails',
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
          type: 'text',
        },
        passwordConfirm: {
          label: 'Confirm Password',
          required: true,
          type: 'text',
        },
        photo: {
          label: 'Profile Phote',
          required: false,
          type: 'text',
        },
      },
      validations: signUpSchema,
    },
    recipients: {
      heading: 'Email Recipients',
      subheading: 'Fill recipient email addresses',
      fields: {
        subject: {
          label: 'Subject',
          required: true,
          type: 'text',
        },
        recipient: {
          label: 'Recipient',
          required: true,
          type: 'text',
        },
        cc: {
          label: 'Cc',
          required: false,
          type: 'text',
        },
      },
      validations: recipientsSchema,
    },
    body: {
      heading: 'Email Body',
      subheading: 'Fill email text',
      fields: {
        body: {
          label: 'Email Body',
          required: true,
          type: 'text',
        },
      },
      validations: bodySchema,
    },
    pictures: {
      heading: 'Upload Pictures',
      subheading: 'Add signature and pictures',
      fields: {
        upload: {
          label: 'Upload',
          required: false,
          type: 'upload',
        },
      },
      //      validations: bodySchema,
    },
    summary: {
      heading: 'Summary',
      subheading: 'Email summary',
      fields: {},
    },
  },
  formData: {},
  formStage: 'landing',
  isLoggedIn: false,
};
