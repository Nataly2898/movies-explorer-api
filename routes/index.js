const router = require('express').Router();
const auth = require('../middlewares/auth');
const celebrates = require('../middlewares/celebrates');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

// Краш-тест сервера
router.get('/crash-test', auth, () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrates.signIn, login);
router.post('/signup', celebrates.signUp, createUser);

router.use(auth);
router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
