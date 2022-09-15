const router = require('express').Router();
const auth = require('../middlewares/auth');
<<<<<<< HEAD
const { createUserValid, loginValid } = require('../middlewares/validators/userValidation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/constants');
=======
const celebrates = require('../middlewares/celebrates');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1

// Краш-тест сервера
router.get('/crash-test', auth, () => {
  setTimeout(() => {
<<<<<<< HEAD
    throw new Error(errorMessages.serverDeadError);
  }, 0);
});

router.post('/signin', loginValid, login);
router.post('/signup', createUserValid, createUser);
=======
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrates.signIn, login);
router.post('/signup', celebrates.signUp, createUser);
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1

router.use(auth);
router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use((req, res, next) => {
<<<<<<< HEAD
  next(new NotFoundError(errorMessages.notFoundSiteError));
=======
  next(new NotFoundError('Страница не найдена'));
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1
});

module.exports = router;
