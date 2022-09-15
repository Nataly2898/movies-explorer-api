const router = require('express').Router();
<<<<<<< HEAD

const {
  updateCurrentUserValid,
  getCurrentUserValid,
} = require('../middlewares/validators/userValidation');

const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUserValid, getCurrentUser);
router.patch('/me', updateCurrentUserValid, updateCurrentUser);
=======
const celebrates = require('../middlewares/celebrates');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrates.profileUpdate, updateProfile);
>>>>>>> 1663ba9a37ac88fe1af2e683b2d8948d4c9d32a1

module.exports = router;
