const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createUserValid, loginValid } = require('../middlewares/validators/userValidation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/constants');

// Краш-тест сервера
router.get('/crash-test', auth, () => {
  setTimeout(() => {
    throw new Error(errorMessages.serverDeadError);
  }, 0);
});

router.post('/signin', loginValid, login);
router.post('/signup', createUserValid, createUser);

router.use(auth);
router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundSiteError));
});

module.exports = router;
