const Movie = require('../models/movie');
const IncorrectRequestError = require('../errors/IncorrectRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// Возвращаем все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// Cоздаём фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
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
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectRequestError('Некорректные данные'));
      }
      return next(err);
    });
};

// Удаляем сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;
  Movie.findById(movieId)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (movie.owner.valueOf() !== _id) {
        return next(new ForbiddenError('Нельзя удалить чужой фильм!'));
      }
      movie
        .findByIdAndRemove(movieId)
        .then((deletedMovie) => res.send(deletedMovie))
        .catch(next);
    });
};
