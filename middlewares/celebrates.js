const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const IncorrectRequestError = require('../errors/IncorrectRequestError');

module.exports.signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.profileUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.movieCreation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new IncorrectRequestError('Неправильный формат URL');
      }
      return value;
    }),
    trailerLink: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new IncorrectRequestError('Неправильный формат URL');
      }
      return value;
    }),
    thumbnail: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new IncorrectRequestError('Неправильный формат URL');
      }
      return value;
    }),
  }),
});

module.exports.movieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});
