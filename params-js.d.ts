/**
 * This module parses command line input parameters in form of "-a <a> -b <b> etc.", where "-a" is a parameter switch and "a" is the value of the parameter
 * The following structure of configuration of parameters has to be passed to the parsing function:
*/
declare class InputParameter {
    name: string;
    switch: string;
    description: string;
    pos: number;
    prompt: string;
    secret: boolean;
    must: boolean;
    default: any;
    error_msg: string;
}
declare class InputParameters {
    config: Array<InputParameter>;
}
