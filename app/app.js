const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const testRouter = require('./routes/test-route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public', 'index.html')));

app.use('/', indexRouter);
app.use('/test-route', testRouter);

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
