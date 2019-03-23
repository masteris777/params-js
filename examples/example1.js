const params_parser = require("../params-js");
const config = require("../examples/example1.params.json");

(async()=>{
    const params = await params_parser(config);

    console.log(params);
    // should print {temp_scale: "F"}

})()
