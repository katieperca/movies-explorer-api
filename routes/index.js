const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');

router.post('/api/signup', createUserValidation, createUser);
router.post('/api/signin', loginValidation, login);
router.use(auth);
router.use('/api/', usersRouter);
router.use('/api/', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
