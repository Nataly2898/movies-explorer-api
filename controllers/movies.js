const Movie = require('../models/movie');
const IncorrectRequestError = require('../errors/IncorrectRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

// Возвращаем все сохранённые текущим  пользователем фильмы
module.exports.getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    if (!movies || movies.length === 0) {
      res.send('Сохраненных фильмов не найдено.');
    }
    return res.status(200).send(movies);
  } catch (err) {
    return next(err);
  }
};

// Cоздаём фильм
module.exports.createMovie = async (req, res, next) => {
  try {
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

    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
    return res.status(200).send(newMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectRequestError('Переданы неверные данные.'));
    }
    return next(err);
  }
};

// Удаляем сохранённый фильм по id
module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId = req.user._id;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(new NotFoundError('Фильм не найден.'));
    }
    const movieOwnerId = movie.owner.valueOf();
    if (movieOwnerId !== userId) {
      return next(new ForbiddenError('Вы не можете удалить чужой фильм!'));
    }
    const deletedMovie = await Movie.findByIdAndRemove(movieId);
    if (!deletedMovie) {
      return next(new NotFoundError('Фильм не найден.'));
    }
    return res.status(200).send(deletedMovie);
  } catch (err) {
    return next(err);
  }
};
