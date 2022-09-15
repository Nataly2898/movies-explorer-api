require('dotenv').config();
const express = require('express');
<<<<<<< HEAD

=======
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
<<<<<<< HEAD
const { ENV_PORT, DB_URL } = require('./utils/config');
=======
const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  DATABASE_URL_DEV,
} = require('./utils/configData');
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
const router = require('./routes');
const { limiter } = require('./utils/rateLimiter');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

<<<<<<< HEAD
=======
// Подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : DATABASE_URL_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
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
<<<<<<< HEAD
app.use('/', router);
=======
app.use(router);
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1

// Подключаем логгер ошибок
app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

<<<<<<< HEAD
mongoose.connect(DB_URL, () => {
  console.log('Подключение прошло успешно');
});

app.listen(ENV_PORT, () => {
  console.log(`Запуск сервера ${ENV_PORT}`);
=======
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
});
