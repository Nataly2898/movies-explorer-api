const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const IncorrectRequestError = require('../../errors/IncorrectRequestError');
const { errorMessages } = require('../../utils/constants');

const validUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new IncorrectRequestError(errorMessages.badRequestErrorMessage);
};

module.exports.movieCreationValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validUrl),
    trailerLink: Joi.string().required().custom(validUrl),
    thumbnail: Joi.string().required().custom(validUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.movieIdValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});
