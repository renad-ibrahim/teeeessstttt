"use strict";

var express = require('express');

var app = express();

var connectToDatabase = require('./config/Database');

var AppError = require('./utils/AppError');

var userRoute = require('./routes/userRoute');

var ErrorHandler = require('./middleware/ErrorHandler');

require('dotenv').config();

var cors = require('cors');

app.use(cors());
app.options('*', cors());
var port = process.env.PORT || 3000;
var urlDataBase = process.env.DATABASE_URL;
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use(ErrorHandler);

const messageRoute = require("../routes/messageRoute")
app.use("/api/v1/messages", messageRoute)

app.all('*', function (req, res, next) {
  next(new AppError("Cant find ".concat(req.originalUrl, " on this server"), 404));
});
connectToDatabase(urlDataBase);
app.listen(port, function () {
  console.log("localhost:", port);
});
//# sourceMappingURL=index.dev.js.map
