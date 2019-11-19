const express = require('express');
const endpoints = require('./routes');

let port = process.env.PORT || 2000 ;

const app = express();

endpoints(app);

app.listen(port, () => {
    console.log('app started at port 2000');
});