const express = require('express');
const config = require('./config/secret');

const mainRoute = require('./routers/main.js');
// express app
const app = express();

app.use(express.static(__dirname + '/public'));

app.use(mainRoute);
// port
app.listen(config.port, () => {
    console.log(` app is listening on port ${config.port}`);
})