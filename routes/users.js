const router = require('express').Router();

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

module.exports = router;
