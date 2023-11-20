import path from 'path';
import express from 'express';

import { sendEmail } from '../controllers/email.controller';
import { routeInfo } from '../middleware/routeInfo';
import { validateEmailFields } from '../middleware/validateEmailFields';

const MODULE = 'client';

const router = express.Router();
router
    .post('/mail', routeInfo({ MODULE }), validateEmailFields, sendEmail)

export default router;