# params-js


## example

```js
const configurator_fn = require("params-js");

const params = await configurator_fn({
    config: [{
        "name": "temp_scale",
        "switch": "-t",
        "description": "node start -t F",
        "pos": 1,
        "default": "C"
    }]
}));

console.log(params);
// should print {temp_scale: "F"}

```