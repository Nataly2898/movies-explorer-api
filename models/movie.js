const mongoose = require('mongoose');
<<<<<<< HEAD
const isUrl = require('validator/lib/isURL');
const { errorMessages } = require('../utils/constants');
=======
const isURL = require('validator/lib/isURL');
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
<<<<<<< HEAD
    type: String,
=======
    type: Number,
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
<<<<<<< HEAD
      validator: (url) => isUrl(url),
      message: errorMessages.incorrectRequestError,
=======
      validator: (v) => isURL(v),
      message: 'Неправильный формат URL',
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
<<<<<<< HEAD
      validator: (url) => isUrl(url),
      message: errorMessages.incorrectRequestError,
=======
      validator: (v) => isURL(v),
      message: 'Неправильный формат URL',
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
    },
  },
  thumbnail: {
    type: String,
    required: true,
<<<<<<< HEAD
=======
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат URL',
    },
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
<<<<<<< HEAD
    type: String,
=======
    type: Number,
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
}, {
  versionKey: 'false',
=======
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
});

module.exports = mongoose.model('movie', movieSchema);
