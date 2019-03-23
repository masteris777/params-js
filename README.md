# params-js
[![Build Status](https://travis-ci.org/masteris777/params-js.svg?branch=master)](https://travis-ci.org/masteris777/params-js)
This simple Nodejs module implements loading of an app configuration from a JSON file, CLI, environment variables or asynchronous input.

## Example1: 
Values to be passed via command line or as environment parameters 

```json
{
    "description": "Example file: example1.params.json",
    "config":[
        {
            "name": "host",
            "description": "The parameter 'host' to be set provided that a) the program has been called from command line with '-h' followed by a value or b) 'host' is among environment parameters. Will throw exception if no parameter passed anyway, since it is market as 'must'",
            "switch": "-h",
            "pos": 1,
            "must": true
        },
        {
            "name": "port",
            "description": "The parameter 'port' to be set provided that a value gets passed via cli or environment. If no value passed - sets to the default value '443'",
            "switch": "-p",
            "pos": 1,
            "default": "443"
        },        
        {
            "name": "secure",
            "description": "The parameter 'secure' will be created provided that the '-s' gets passed via cli () or environment variable. Otherwise the parameter will stay 'undefined'",
            "switch": "-s",
            "pos": 0
        }
    ]
}
```

```
node example1.js -h myhost.com -s
```

```js
const params_parser = require("params-js");
const config = require("example1.params.json");

(async()=>{
    const params = await params_parser(config);

    console.log(params);
    // { host: 'myhost.com', port: '443', secure: '-s' }

})()

```

## Example2: 
Values to be passed via command line, as environment parameters, or prompted  

```json
{
    "description": "Example file example2.params.json: Username and password to be passed via cli, as env parameters or prompted for input",
    "config": [
        {
            "name": "user",
            "description": "user value to be pr",
            "switch": "-u",
            "pos": 1,
            "prompt": "Please specify username:"
        },
        {
            "name": "password",
            "description": "",
            "switch": "-p",
            "pos": 1,
            "prompt": "Please specify password:",
            "secret": true
        }
    ]
}
```

```js
const config = require("example2.params.json");
const params = await params_parser(config, async item => {
    return item.secret ? await secureInput(item.prompt) : await plainInput(item.prompt);
    /*
        Please specify username: admin
        Please specify password: ************
    */
});
console.log(params);

```