export interface IStateType {
  formFields: {
    [key: string]: string;
  };
  formData: {
    [key: string]: string | string[];
  };
  formStage: string;
}

export const initialState: IStateType = {
  formFields: {
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
          type: 'text',
        },
      },
    },
    signup: {
      heading: 'Sign Up',
      subheading: 'Fill your user credentials',
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
    },
    summary: {
      heading: 'Summary',
      subheading: 'Email summary',
      fields: {},
    },
  },
  formData: {},
  formStage: '',
};

const dataReducer = (state, action) => {
  const { type, payload } = action;
  const { formStage, fieldName, fieldValue } = payload;

  switch (type) {
    case 'SET_STAGE':
      console.log('SET_STAGE', payload);
      return {
        ...state,
        formStage,
      };
    case 'UPDATE_FIELD':
      console.log('UPDATE_FIELD', payload);
      return {
        ...state,
        formData: {
          ...state.formData,
          [fieldName]: fieldValue,
        },
      };

    default:
      throw new Error(`No case for type ${type} found in dataReducer.`);
  }
};

export default dataReducer;
