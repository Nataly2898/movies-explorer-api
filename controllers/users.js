const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ExistingEmailError = require('../errors/ExistingEmailError');
const IncorrectRequestError = require('../errors/IncorrectRequestError');
const NotFoundError = require('../errors/NotFoundError');
const NotAuthorizationError = require('../errors/NotAuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

// Создание нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ExistingEmailError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectRequestError('Ошибка валидации данных'));
      } else next(err);
    });
};

// Аутентификация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        {
          expiresIn: '7d',
        },
      );

      // вернём токен
      res.send({ token });
    })
    .catch(() => next(new NotAuthorizationError('Неверный email или пароль.')));
};

// Возвращает информацию о пользователе
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).then((user) => {
    // проверяем, есть ли пользователь с таким id
    if (!user) {
      return next(new NotFoundError('Пользователь не найден.'));
    }

    // возвращаем пользователя, если он есть
    return res.send(user);
  });
};

// Обновление информации о пользователе
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectRequestError('Неверный тип данных.'));
      }
      return next(err);
    });
};
