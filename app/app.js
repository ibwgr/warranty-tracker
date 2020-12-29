const express = require('express');
const router = require('./controller/router.js');
const bodyParser = require("body-parser");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/view", express.static('./view/'));
app.use('/', router);

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
