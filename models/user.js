const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const NotAuthorizationError = require('../errors/NotAuthorizationError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

// Проверка почты и пароля
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      throw new NotAuthorizationError('Неправильные почта или пароль');
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new NotAuthorizationError('Неправильные почта или пароль');
      }

      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
