const express = require('express');
const titleController = require('../controllers/titleController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

// Get comments for specific title
router.use('/:titleId/comments', commentRouter);

// Get top 10
router
  .route('/top-10')
  .get(titleController.aliasTopTen, titleController.getAllTitles);

router
  .route('/') //  all titles
  .get(titleController.getAllTitles)
  .post(
    authController.protect,
    authController.restrictTo('regent', 'admin'),
    titleController.createTitle
  );

router
  .route('/:id')
  .get(titleController.getTitle)
  .patch(
    authController.protect,
    authController.restrictTo('regent', 'admin'),
    titleController.updateTitle
  )
  .delete(
    authController.protect,
    authController.restrictTo('regent', 'admin'),
    titleController.deleteTitle
  );

module.exports = router;
