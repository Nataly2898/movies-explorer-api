const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

function isUrl(link) {
  const result = validator.isURL(link);
  if (result) {
    return link;
  }
  throw new Error('Невалидный URL');
}

function validateObjectId(value) {
  const isValid = mongoose.isValidObjectId(value);

  if (isValid) return value;

  throw new Error('Невалидный ID');
}

module.exports.movieCreationValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isUrl),
    trailerLink: Joi.string().required().custom(isUrl),
    thumbnail: Joi.string().required().custom(isUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports.movieIdValid = celebrate({
  params: Joi.object().keys({
    id: Joi.string().custom(validateObjectId),
  }),
});
