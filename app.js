require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  DATABASE_URL_DEV,
} = require('./utils/configData');
const router = require('./routes');
const { limiter } = require('./utils/rateLimiter');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// Подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : DATABASE_URL_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Подключаем логгер запросов
app.use(requestLogger);

app.use(limiter);
app.use(cors);
app.use(helmet());
app.use(router);

// Подключаем логгер ошибок
app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
