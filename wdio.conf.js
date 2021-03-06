exports.config = {
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub/',
    specs: [
        './test/specs/**/*.ts'
    ],
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'selenoid:options': {
            enableVNC: true
        }
    }],
    services: ['devtools'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    beforeSession: function () {
        require('expect-webdriverio')
    },
}
