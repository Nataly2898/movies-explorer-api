const router = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrates.movieCreation, createMovie);
router.delete('/:movieId', celebrates.movieId, deleteMovie);

module.exports = router;
