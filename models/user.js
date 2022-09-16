const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const NotAuthorizationError = require('../errors/NotAuthorizationError');
const { errorMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => isEmail(email),
        message: errorMessages.validationEmailError,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: 'false',
  },
);

// Проверка почты и пароля
userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new NotAuthorizationError(
            errorMessages.notAuthorizationError,
          ),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new NotAuthorizationError(
              errorMessages.notAuthorizationError,
            ),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
