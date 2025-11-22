const RealEstate = require('../models/RealEstate');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

exports.getListings = asyncHandler(async (req, res, next) => {
  const filters = {
    category: req.query.category,
    province: req.query.province,
    location: req.query.location,
    minPrice: req.query.minPrice ? parseInt(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined
  };

  const listings = await RealEstate.findAll(filters);

  res.status(200).json({
    success: true,
    count: listings.length,
    data: listings
  });
});

exports.getListing = asyncHandler(async (req, res, next) => {
  const listing = await RealEstate.findById(req.params.id);

  if (!listing) {
    return next(new ErrorResponse(`Real estate listing not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: listing
  });
});

exports.createListing = asyncHandler(async (req, res, next) => {
  const listingData = {
    title: req.body.title,
    category: req.body.category,
    investment_min: req.body.price_min || req.body.investment_min || 0,
    investment_max: req.body.price_max || req.body.investment_max || 0,
    description: req.body.description,
    image_url: req.body.image || req.body.image_url,
    website: req.body.website,
    location: req.body.location,
    province: req.body.province,
    country: req.body.country || 'Canada',
    source: req.body.source || 'manual',
    metadata: req.body.metadata || {}
  };

  const listing = await RealEstate.create(listingData);

  res.status(201).json({
    success: true,
    data: listing
  });
});

exports.updateListing = asyncHandler(async (req, res, next) => {
  const updateData = {};

  if (req.body.title) updateData.title = req.body.title;
  if (req.body.category) updateData.category = req.body.category;
  if (req.body.description) updateData.description = req.body.description;
  if (req.body.price_min !== undefined) updateData.investment_min = req.body.price_min;
  if (req.body.price_max !== undefined) updateData.investment_max = req.body.price_max;
  if (req.body.image) updateData.image_url = req.body.image;
  if (req.body.location) updateData.location = req.body.location;
  if (req.body.province) updateData.province = req.body.province;
  if (req.body.website) updateData.website = req.body.website;
  if (req.body.metadata) updateData.metadata = req.body.metadata;

  const listing = await RealEstate.update(req.params.id, updateData);

  if (!listing) {
    return next(new ErrorResponse(`Real estate listing not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: listing
  });
});

exports.deleteListing = asyncHandler(async (req, res, next) => {
  const listing = await RealEstate.delete(req.params.id);

  if (!listing) {
    return next(new ErrorResponse(`Real estate listing not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await RealEstate.getCategories();

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

exports.getListingsByProvince = asyncHandler(async (req, res, next) => {
  const listings = await RealEstate.getByProvince(req.params.province);

  res.status(200).json({
    success: true,
    count: listings.length,
    data: listings
  });
});
