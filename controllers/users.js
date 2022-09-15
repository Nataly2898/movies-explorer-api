const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ExistingEmailError = require('../errors/ExistingEmailError');
const IncorrectRequestError = require('../errors/IncorrectRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/constants');
const { JWT_KEY } = require('../utils/config');

// Создание нового пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(({ _id }) => User.findById(_id))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectRequestError(errorMessages.validationErrorMessage);
      }
      if (err.code === 11000) {
        throw new ExistingEmailError(errorMessages.emailExistingEmailError);
      }
      next(err);
    })
    .catch(next);
};

// Аутентификация пользователя
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

// Возвращает информацию о пользователе
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(errorMessages.notFoundUserError);
    })
    .then((user) => res.send(user))
    .catch(next);
};

// Обновление информации о пользователе
module.exports.updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError(errorMessages.notFoundUserError);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new IncorrectRequestError(errorMessages.validationErrorMessage);
      }
      if (err.code === 11000) {
        throw new ExistingEmailError(errorMessages.emailExistingEmailError);
      }
      next(err);
    })
    .catch(next);
};
