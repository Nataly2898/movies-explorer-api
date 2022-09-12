const router = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrates.profileUpdate, updateProfile);

module.exports = router;
