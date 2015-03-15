exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'test/e2e/*.js'
    ],

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'firefox'
    },

    baseUrl: 'http://localhost:8000/src/app/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
