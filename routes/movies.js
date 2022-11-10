const router = require('express').Router();
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:movieId', deleteMovieValidation, deleteMovieById);

module.exports = router;
