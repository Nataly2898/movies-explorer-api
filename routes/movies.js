const router = require('express').Router();
<<<<<<< HEAD

const {
  movieCreationValid,
  movieIdValid,
} = require('../middlewares/validators/movieValidation');
=======
const celebrates = require('../middlewares/celebrates');
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
<<<<<<< HEAD
router.post('/movies', movieCreationValid, createMovie);
router.delete('/:movieId', movieIdValid, deleteMovie);
=======
router.post('/movies', celebrates.movieCreation, createMovie);
router.delete('/movies/:movieId', celebrates.movieId, deleteMovie);
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1

module.exports = router;
