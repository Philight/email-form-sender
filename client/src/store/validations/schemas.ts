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
  photo: yup.string().url(),
});

const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const recipientsSchema = yup.object().shape({
  subject: yup.string().required(),
  to: yup.string().email().required(),
  cc: yup
    .string()
    .transform(value => Array.from(new Set(value.split(';'))).join(';')) // dedupe - optional step
    .test(
      'cc',
      'Invalid email address/es, must be separated by " ; "',
      value => value == null || value == undefined || (value && value.split(';').every(isEmail)), // optional
    ),
});

export const bodySchema = yup.object().shape({
  body: yup.string().min(10).required(),
});
