const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
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
  } = req.body;
  const owner = req.user._id;

  Movie.findOne({ movieId, owner }, (err, foundMovie) => {
    if (!foundMovie) {
      Movie.create({
        owner,
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
      })
        .then((movie) => res.send(movie))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.send(err);
            // next(new BadRequestError('Переданы некорректные данные при создании фильма'));
          } else {
            next(err);
          }
        });
    }
  });
}

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const ownerId = req.user._id;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм с указанным _id не найден'))
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === ownerId) {
          movie.delete()
            .then(() => res.send({ message: 'Фильм успешно удален' }))
            .catch(next);
        } else {
          throw new ForbiddenError('Вы не можете удалять чужие фильмы');
        }
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id фильма'));
      } else {
        next(err);
      }
    });
};
