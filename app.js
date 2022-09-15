require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { ENV_PORT, DB_URL } = require('./utils/config');
const router = require('./routes');
const { limiter } = require('./utils/rateLimiter');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

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
app.use('/', router);

// Подключаем логгер ошибок
app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

mongoose.connect(DB_URL, () => {
  console.log('Подключение прошло успешно');
});

app.listen(ENV_PORT, () => {
  console.log(`Запуск сервера ${ENV_PORT}`);
});
