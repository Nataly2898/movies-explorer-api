const router = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', celebrates.movieCreation, createMovie);
router.delete('/movies/:movieId', celebrates.movieId, deleteMovie);

module.exports = router;
