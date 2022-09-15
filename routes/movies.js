const router = require('express').Router();

const {
  movieCreationValid,
  movieIdValid,
} = require('../middlewares/validators/movieValidation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', movieCreationValid, createMovie);
router.delete('/:movieId', movieIdValid, deleteMovie);

module.exports = router;
