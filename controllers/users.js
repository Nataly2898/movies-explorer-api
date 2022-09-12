const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ExistingEmailError = require('../errors/ExistingEmailError');
const IncorrectRequestError = require('../errors/IncorrectRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = require('../utils/configData');

// Создание нового пользователя
module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return next(new ExistingEmailError(`Пользователь с ${email} уже существует.`));
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hash,
      name,
    });
    return res.status(200).send({
      name: newUser.name,
      _id: newUser._id,
      email: newUser.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectRequestError('Переданы неверные данные.'));
    }
    return next(err);
  }
};

// Аутентификация пользователя
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new IncorrectRequestError('Неверный email или пароль.'));
    }
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        {
          expiresIn: '7d',
        },
      );
      // вернём токен
      return res.send({ token });
    }
    return res.status(201).send('Вы авторизованы.');
  } catch (err) {
    return next(err);
  }
};

// Возвращает информацию о пользователе
module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      return next(new NotFoundError('Пользователь не найден.'));
    }
    return res.status(200).send({
      name: currentUser.name,
      email: currentUser.email,
    });
  } catch (err) {
    return next(err);
  }
};

// Обновление информации о пользователе
module.exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    );
    return res.status(200).send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectRequestError('Неверный тип данных.'));
    }
    return next(err);
  }
};
