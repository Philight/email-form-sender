import express from "express"
import * as dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';

import apiRouter from './src/routes/email.routes';
import { mailerClient, mailerSend } from './src/utils/connectGRPC';
import { getDateTime } from './src/utils/date';
import { message, TMessage } from './src/utils/logger';

const MODULE = path.basename(__filename).replace('.js', '');
const PORT = parseInt(process.env.PORT, 10) || 80;
const HOSTNAME = process.env.HOSTNAME;


/********** 
     SERVER CONFIG
*********/

var server = express();

server.use(bodyParser.json({ limit: '50mb' }));
//server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const corsOptions = {
   origin: '*', 
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}
server.use(cors(corsOptions)); 


/********** 
    INITIAL ACTIONS
*********/

const sendTestEmail = async () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 5);
    mailerClient.waitForReady(deadline, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        const testEmailBody = {
            'from': 'obd.sf.test01@gmail.com',
            'to': 'lai.filip@gmail.com',
            'cc': ['test01@gmail.com', 'test02@gmail.com', 'test03@gmail.com'],
            'subject': 'subject',
            'body': 'Lorem ipsum..',
            'attachments': '',
        }
        mailerSend(testEmailBody);
    });
}

const initialActions = async () => {
    message(MODULE, `Running initial actions..`, TMessage.WAIT);

    // SEND TEST EMAIL
//    await sendTestEmail();

    /*
    const resp = await got('http://localhost:5555/db/ads', {
      method: 'PUT',
      json: {a: 3},
    });   
    */ 
}


/********** 
    ROUTES
*********/

server
    .get('/', (req, res, next) => {
console.log(`### ${MODULE} | GET / "APP ROOT"`);
        res.statusMessage = 'statusMessage';
        res.status(200).json({ message: `GET '/' ROOT PATH` });
    })

    .use('/api/v1', apiRouter)


/********** 
    START server
*********/

// HTTP

http.createServer(server)
  .listen(PORT, (err) => {
    if (!!err) {
      message(MODULE, `Failed to start HTTP server\n${err+(err && err.stack)}`, TMessage.ERROR);

    } else {
      message(MODULE, `----------------------------------------------`, TMessage.INFO);
      message(MODULE, `HTTP server OK @ http://${HOSTNAME}:${PORT}`, TMessage.SUCCESS);

      const dateNow = getDateTime(new Date());
      message(MODULE, `$$$ SERVER START: ${dateNow}`, TMessage.SUCCESS);
      message(MODULE, `----------------------------------------------`, TMessage.INFO);

      initialActions();
    }
  });