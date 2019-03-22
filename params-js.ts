/**
 * This module parses command line input parameters in form of "-a <a> -b <b> etc.", where "-a" is a parameter switch and "a" is the value of the parameter
 * The following structure of configuration of parameters has to be passed to the parsing function:
*/

class InputParameter {
    public name!: string; //Name of the parameter - you can refer to the parameter value $.param1 after a successful parsing 
    public switch!: string; //The switch which precedes the parameter value (e.g. -a) to distinguish the param
    public description!: string; //Descripion of parameter which will be printed if <help> parameter is present
    public pos!: number; //Value place relative to switch, 1 (the switch value) by default
    public prompt!: string; // Prompt if a value has net been provided
    public secret!: boolean; //Is the value a secret? 
    public must!: boolean; //Is it must or optional? if must, error will be thrown if not present
    public default: any //Default value could be anything
    public error_msg!: string;
}

class InputParameters {
    public config!: Array<InputParameter>;
}

module.exports = async (inputParameters: InputParameters, inputCallBack?: Function): Promise<Object> => {

    const params: any = <Object>{};

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
            if (!inputCallBack) return Promise.reject(`${el.name} parameter requires inputCallBack function, which is not provided to params-js parser`)
            params[el.name] = await inputCallBack(el);
            continue;
        }

        // set the default value if present
        if (el.default) {
            params[el.name] = el.default;
            continue;
        }

        // if no variable present then fail provided that it is must
        if (el.must) return Promise.reject(el.error_msg || "Missing mandatory parameter " + el.name);

    }

    return Promise.resolve(params);

};
