import {TYPE_WARN, TYPE_ERR} from './index.js'

function log(log, type = 'log') {
    console[type](log);
}

export default log;