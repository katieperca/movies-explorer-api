const router = require('express').Router();
const { updateProfileValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateProfileValidation, updateProfile);

module.exports = router;
