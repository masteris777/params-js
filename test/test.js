"use strict";
const assert = require('assert');
const configurator_fn = require("../params-js");
const cases_to_test = require("./test.cases.json");

describe('Parsing tests', () => {

    for (const case_to_test of cases_to_test) {

        it(case_to_test.item.description, async () => {

            let params = null, error_msg = null;

            let argv = {}, env = {};
            Object.assign(argv, process.argv);
            Object.assign(env, process.env);

            process.argv = case_to_test.argv;
            Object.assign(process.env, case_to_test.env);

            try {
                params = await configurator_fn({ config: [case_to_test.item] }, async item => {
                    if (item.prompt !== "input") return Promise.reject("");
                    return Promise.resolve(item.secret ? case_to_test.prompt.secret : case_to_test.prompt.plain);
                });
            } catch (e) {
                error_msg = e;
            }

            if (case_to_test.expected_rezult.resolved) {
                params = params === null ? "" : params; //deep equal fails to compare with null, so I set to empty string
                assert.deepEqual(params, case_to_test.expected_rezult.params);
            } else {
                assert.deepEqual(error_msg, case_to_test.expected_rezult.error_msg);
            }

            process.argv = argv;
            process.env = env;

        });
    }

});

describe('Callback tests', async () => {
    it("Should reject if no callback function for input provided", async () => {
        process.argv = [];
        await assert.rejects(
            configurator_fn({
                config: [{
                    "name": "aaa",
                    "switch": "-aaa",
                    "description": "No CLI, ENV variable provided, an input requested, value should be 'env'",
                    "pos": 1,
                    "default": "bbb",
                    "prompt": "input",
                }]
            }));
    });
});
