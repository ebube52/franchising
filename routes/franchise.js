const express = require('express');
const {
  getFranchises,
  getFranchise,
  createFranchise,
  updateFranchise,
  deleteFranchise,
  searchFranchises,
  getFranchiseStats
} = require('../controllers/franchise');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getFranchises)
  .post(protect, createFranchise);

router.route('/search').post(searchFranchises);

router.route('/stats').get(getFranchiseStats);

router
  .route('/:id')
  .get(getFranchise)
  .put(protect, updateFranchise)
  .delete(protect, authorize('admin'), deleteFranchise);

module.exports = router;
