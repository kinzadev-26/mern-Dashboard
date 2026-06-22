const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/', protect, getAllUsers);
router.post('/', protect, createUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;