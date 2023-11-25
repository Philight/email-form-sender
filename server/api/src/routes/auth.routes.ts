import path from 'path';
import express from 'express';

import { sendEmail } from '../controllers/email.controller';
import { signUp, getImageKitAuth } from '../controllers/auth.controller';
import { routeInfo } from '../middleware/routeInfo';
import { validateUserFields } from '../middleware/validateUserFields';
import { validateEmailFields } from '../middleware/validateEmailFields';

const MODULE = 'API';

const router = express.Router();
router
    .get('/imagekit', routeInfo({ MODULE }), getImageKitAuth)
    .post('/sign-up', routeInfo({ MODULE }), validateUserFields, signUp)
    .post('/verify-email', routeInfo({ MODULE }), validateEmailFields, sendEmail)
//    .post('/sign-in', routeInfo({ MODULE }), validateEmailFields, sendEmail)
//    .post('/sign-in', routeInfo({ MODULE }), validateEmailFields, sendEmail)

export default router;