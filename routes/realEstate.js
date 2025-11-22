const express = require('express');
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getCategories,
  getListingsByProvince
} = require('../controllers/realEstate');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getListings)
  .post(protect, createListing);

router.route('/categories').get(getCategories);

router.route('/province/:province').get(getListingsByProvince);

router
  .route('/:id')
  .get(getListing)
  .put(protect, updateListing)
  .delete(protect, authorize('admin'), deleteListing);

module.exports = router;
