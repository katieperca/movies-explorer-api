require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { DB_CONN_DEV, NODE_ENV, DB_CONN_PROD } = require('./utils/config');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_CONN_PROD : DB_CONN_DEV, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
