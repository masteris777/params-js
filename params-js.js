"use strict";
/**
 * This module parses command line input parameters in form of "-a <a> -b <b> etc.", where "-a" is a parameter switch and "a" is the value of the parameter
 * The following structure of configuration of parameters has to be passed to the parsing function:
*/
class InputParameter {
}
class InputParameters {
}
module.exports = async (inputParameters, inputCallBack) => {
    const params = {};
    for (const el of inputParameters.config) {
        // if the argument is present via cli, resolve and continue
        let pos = process.argv.indexOf(el.switch);
        if (pos != -1) { // parameter found in process.argv
            params[el.name] = process.argv[pos + (el.pos || 0)];
            continue;
        }
        // if environment variables are present, resolve and continue
        if (process.env[el.name]) {
            params[el.name] = process.env[el.name];
            continue;
        }
        //if no variable is set, but prompt requited - ask for parameter input
        if (el.prompt) {
            if (!inputCallBack)
                return Promise.reject(`${el.name} parameter requires inputCallBack function, which is not provided to params-js parser`);
            params[el.name] = await inputCallBack(el);
            continue;
        }
        // set the default value if present
        if (el.default) {
            params[el.name] = el.default;
            continue;
        }
        // if no variable present then fail provided that it is must
        if (el.must)
            return Promise.reject(el.error_msg || "Missing mandatory parameter " + el.name);
    }
    return Promise.resolve(params);
};
