const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');
const commentRouter = require('../routes/commentRoutes');

const router = express.Router();

// Authorization
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/auth', authController.protect, userController.auth);

// Google auth
router.post('/google/signin', authController.googleSignIn);

// Reset password functionality
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

// actions when User is logged in
router
  .route('/me')
  .get(userController.getMe, userController.getUser)
  .delete(userController.deleteAvatarForever, userController.deleteUser);

router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.checkForFile,
  userController.deleteAvatarForever,
  userController.setImageFilenameForDataBase,
  userController.updateMe
);

// Only for Favourites
router.patch('/updateMyTitles', userController.updateMyTitles);

router.patch('/updatePassword', authController.updatePassword);

// Get comments for specific User
router.use('/:userId/comments', commentRouter);

//  Routes for 'admin'
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(commentController.deleteUserComments, userController.deleteUser);

module.exports = router;
