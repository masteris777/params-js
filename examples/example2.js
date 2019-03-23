const params_parser = require("../params-js");
const config = require("../examples/example2.params.json");


function secureInput(item){
    return Promise.resolve("mypassword");
}
function plainInput(item){
    return Promise.resolve("admin");
}

(async()=>{
    const params = await params_parser(config, async item => {
        return item.secret ? await secureInput(item.prompt) : await plainInput(item.prompt);
        /*
            Please specify username: admin
            Please specify password: ************
        */
    });
    console.log(params);
})()
