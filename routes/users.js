const router = require('express').Router();
const celebrates = require('../middlewares/celebrates');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', celebrates.profileUpdate, updateProfile);

module.exports = router;
