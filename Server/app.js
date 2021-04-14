var express = require('express');
var fs = require('fs');
const fileType = require('file-type')
var path = require('path');
var cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const os = require("os");
var app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
// var options = {
//   host: config.db.host,
//   port: config.db.port,
//   user: config.db.user,
//   password: config.db.password,
//   database: 'usersessiondb'
// };



/**
 * Set node environments
 */
process.title = 'video-app'

process.env.NODE_ENV = "development";

//setting configs
const config = require('./config/config.development');

const indexRouter = require('./routes/route');
const requestMiddleware = require('./middleware/request.middleware');

app.set(config)
app.enable("trust proxy");

//  apply to all requests
app.use(requestMiddleware);
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/app', indexRouter);

app.listen(config.port);

console.log('Express listening on port --> ', config.port);

