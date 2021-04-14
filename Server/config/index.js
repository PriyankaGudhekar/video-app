//satic data to don't have to generate the conf_adata 2 times
let appConfig = null
module.exports = function () {
    // if the api config data was already set. return it
    if (appConfig != null && appConfig != undefined) {
        return appConfig
    }
    appConfig = {}
    //Load api configs
    switch (process.env.NODE_ENV) {
        case "development":
            appConfig = require('./config.development.js');
            break;
        case "uat":
            appConfig = require('./config.uat.js');
            break;
        case "production":
            appConfig = require('./config.production.js');
            break;
        default:
            console.log("Process Environment Not Found");
            console.log("Please add local host name in environment file");
            process.exit();
    }
    return appConfig
}