const Movie = require('../models/movie');
const IncorrectRequestError = require('../errors/IncorrectRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/constants');

// Возвращаем все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(errorMessages.notFoundErrorDB);
      }
      res.send(movies);
    })
    .catch(next);
};

// Cоздаём фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(200).send({
      _id: movie._id,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectRequestError(errorMessages.validationErrorMessage);
      }
      return next(err);
    })
    .catch(next);
};

// Удаляем сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError(errorMessages.movieNotFoundError);
    })
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        return Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      }
      throw new ForbiddenError(errorMessages.forbiddenErrorMessage);
    })
    .catch(next);
};
