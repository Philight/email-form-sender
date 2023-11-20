import path from 'path';
const fs = require('fs');

import { getDateTime, elapsedTime } from './date';

//const LOGPATH = path.join(LOGDIR, 'myLogs.log');
const LOGDIR = path.join(process.cwd(), 'logs');
const MODULE = path.basename(__filename).replace('.js', '');

const LINE_DIVIDER1 = '================================================================================================\n';
const LINE_DIVIDER2 = '------------------------------------------------------------------------------------------------\n';
const RUNTIME_HEADER 
= `START TIME\t\t\t\t|\t\tEND TIME\t\t\t\t|\t\tELAPSED\t\t|\t\tITEMS
${LINE_DIVIDER1}`;


/********** 
    LOGGING
*********/

/* Styled Log Message */
module.exports.logMessage = (log, stack) => {
  const stackTrace = stack || '';
  const dateNow = getDateTime(new Date());
  
  const message = 
    LINE_DIVIDER1 + dateNow + '\t|\t' + log + '\n'
    + LINE_DIVIDER2 
    + 'STACKTRACE: ' + stackTrace + '\n'
    + LINE_DIVIDER1;

  return message;
}


/* Write Log */
module.exports.writeLog = (fileName, message) => {
  // Create LOG directory
  if (!fs.existsSync(LOGDIR)) { fs.mkdirSync(LOGDIR); }

  const LOGPATH = path.join(LOGDIR, fileName);

  // Create LOG FILE WITH HEADERS
  if (fileName === 'runtime' && !fs.existsSync(LOGPATH)) { 
    fs.writeFileSync(LOGPATH, RUNTIME_HEADER, { encoding: 'utf8', flag: 'w' }); // append mode
  }

  try {
    fs.writeFileSync(LOGPATH, message, { encoding: 'utf8', flag: 'a' }); // append mode

  } catch (err) {
    const errMessage = module.exports.logMessage(err, err && err.stack);
    fs.writeFileSync(LOGPATH, errMessage+'\n', { encoding:'utf8', flag: 'a' });
  }
}


/* Main Logging function */
module.exports.createLog = (log, stack) => {
  module.exports.writeLog(module.exports.logMessage(log, stack));
}


/**
 * STD-IN/OUT 
 */
module.exports.TMessage = {
  WAIT: 'WAIT',         // ---
  ERROR: 'ERROR',       // !!!
  INFO: 'INFO',         // ###
  SUCCESS: 'SUCCESS',   // +++
  OUTPUT: 'OUTPUT',     // >>>
}

module.exports.message = (iModuleName, message, type) => {
  let symbol = '';
  let moduleName = iModuleName ?? '';

  switch(type) {
    case module.exports.TMessage.WAIT:
      symbol = '---';
      break;    
    case module.exports.TMessage.INFO:
      symbol = '###';
      break;
    case module.exports.TMessage.OUTPUT:
      symbol = '>>>';
      break;        
    case module.exports.TMessage.ERROR:
      symbol = '!!!';
      break;
    case module.exports.TMessage.SUCCESS:
      symbol = '+++';
      break;        
    default:
      break;
  }
  if (type == module.exports.TMessage.ERROR) {
    console.error(`${symbol} [ ${moduleName} ] 🛑 ${message}\n`);

  } else if (type == module.exports.TMessage.SUCCESS) {
    console.log(`${symbol} [ ${moduleName} ] ✅ ${message}`);

  } else {
    console.log(`${symbol} [ ${moduleName} ] ${message}`);
  }
}

module.exports.printObject = (object) => {
  console.dir(object, { depth: 2 });
}

module.exports.printHTML = async (page, fileName) => {
  const DIRNAME = path.join(process.cwd(), 'html');
  if (!fs.existsSync(DIRNAME)) {
    fs.mkdirSync(DIRNAME, { recursive: true });
  }
  const HTML = await page.content();
  try {
    const FILEPATH = path.join(DIRNAME, `${fileName}.html`);
    fs.writeFileSync(FILEPATH, HTML);
    module.exports.message(MODULE, `printHTML | HTML printed: `+FILEPATH, module.exports.TMessage.SUCCESS);
  } catch(e) {
    module.exports.message(MODULE, `printHTML | ${e+(e && e.stack)}`, module.exports.TMessage.ERROR);
  }
}