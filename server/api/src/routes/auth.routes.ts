import path from 'path';
import express from 'express';

import { sendEmail } from '../controllers/email.controller';
import { getImageKitAuth, signUp, verifyEmail, signIn, getMe } from '../controllers/auth.controller';
import { routeInfo } from '../middleware/routeInfo';
import { validateSignUpFields } from '../middleware/validateSignUpFields';
import { validateSignInFields } from '../middleware/validateSignInFields';

const MODULE = 'API';

const router = express.Router();
router
    .get('/imagekit', routeInfo({ MODULE }), getImageKitAuth)
    .post('/sign-up', routeInfo({ MODULE }), validateSignUpFields, signUp)
    .post('/sign-in', routeInfo({ MODULE }), validateSignInFields, signIn)
    .get('/verify-email', routeInfo({ MODULE }), verifyEmail)
    .post('/me', routeInfo({ MODULE }), getMe)

export default router;