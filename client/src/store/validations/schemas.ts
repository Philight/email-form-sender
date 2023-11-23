import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  passwordConfirm: yup.string().min(6).required(),
});

export const recipientsSchema = yup.object().shape({
  subject: yup.string().required(),
  recipient: yup.string().email().required(),
  cc: yup.string(),
});

export const bodySchema = yup.object().shape({
  body: yup.string().required(),
});
