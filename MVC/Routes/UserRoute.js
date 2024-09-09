const router = require('express').Router();
const UserController = require('../Controllers/UserController');
const { authenticateToken } = require('../Middleware/authMiddleware');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);
router.get('/profile', UserController.getUser);
router.put('/profile', UserController.updateUser);

module.exports = router;

