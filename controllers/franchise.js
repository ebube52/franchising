const Franchise = require('../models/Franchise');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

exports.getFranchises = asyncHandler(async (req, res, next) => {
  const filters = {
    industry: req.query.industry,
    minInvestment: req.query.minInvestment ? parseInt(req.query.minInvestment) : undefined,
    maxInvestment: req.query.maxInvestment ? parseInt(req.query.maxInvestment) : undefined,
    region: req.query.region
  };

  const franchises = await Franchise.findAll(filters);

  res.status(200).json({
    success: true,
    count: franchises.length,
    data: franchises
  });
});

exports.getFranchise = asyncHandler(async (req, res, next) => {
  const franchise = await Franchise.findById(req.params.id);

  if (!franchise) {
    return next(new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: franchise
  });
});

exports.createFranchise = asyncHandler(async (req, res, next) => {
  const franchiseData = {
    id: req.body.id || `franchise-${Date.now()}`,
    name: req.body.name,
    brand: req.body.brand || req.body.name,
    industry: req.body.industry,
    investment_min: req.body.investmentMin || req.body.investment_min,
    investment_max: req.body.investmentMax || req.body.investment_max,
    region: req.body.region || [],
    description: req.body.description,
    image: req.body.image,
    business_model: req.body.businessModel || req.body.business_model || 'Franchise',
    support_provided: req.body.supportProvided || req.body.support_provided || [],
    franchise_fee: req.body.franchiseFee || req.body.franchise_fee,
    royalty_fee: req.body.royaltyFee || req.body.royalty_fee,
    territories: req.body.territories,
    established: req.body.established,
    website: req.body.website,
    contact_info: req.body.contactInfo || req.body.contact_info || {},
    requirements: req.body.requirements || {},
    data_source: req.body.dataSource || req.body.data_source || 'manual',
    raw_data: req.body.rawData || req.body.raw_data || {},
    is_active: true
  };

  const franchise = await Franchise.create(franchiseData);

  res.status(201).json({
    success: true,
    data: franchise
  });
});

exports.updateFranchise = asyncHandler(async (req, res, next) => {
  const updateData = {};

  if (req.body.name) updateData.name = req.body.name;
  if (req.body.brand) updateData.brand = req.body.brand;
  if (req.body.industry) updateData.industry = req.body.industry;
  if (req.body.investmentMin !== undefined) updateData.investment_min = req.body.investmentMin;
  if (req.body.investmentMax !== undefined) updateData.investment_max = req.body.investmentMax;
  if (req.body.region) updateData.region = req.body.region;
  if (req.body.description) updateData.description = req.body.description;
  if (req.body.image) updateData.image = req.body.image;
  if (req.body.website) updateData.website = req.body.website;
  if (req.body.contactInfo) updateData.contact_info = req.body.contactInfo;
  if (req.body.requirements) updateData.requirements = req.body.requirements;

  const franchise = await Franchise.update(req.params.id, updateData);

  if (!franchise) {
    return next(new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: franchise
  });
});

exports.deleteFranchise = asyncHandler(async (req, res, next) => {
  const franchise = await Franchise.delete(req.params.id);

  if (!franchise) {
    return next(new ErrorResponse(`Franchise not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

exports.searchFranchises = asyncHandler(async (req, res, next) => {
  const searchCriteria = {
    industry: req.body.industry,
    investmentRange: req.body.investmentRange,
    lifestyle: req.body.lifestyle,
    region: req.body.region,
    additionalPreferences: req.body.additionalPreferences
  };

  const franchises = await Franchise.search(searchCriteria);

  const matches = franchises.map(franchise => ({
    ...franchise,
    matchScore: calculateMatchScore(franchise, searchCriteria)
  })).sort((a, b) => b.matchScore - a.matchScore);

  res.status(200).json({
    success: true,
    count: matches.length,
    data: {
      matches,
      totalMatches: matches.length,
      searchCriteria
    }
  });
});

exports.getFranchiseStats = asyncHandler(async (req, res, next) => {
  const stats = await Franchise.getStats();

  res.status(200).json({
    success: true,
    data: stats
  });
});

function calculateMatchScore(franchise, criteria) {
  let score = 0;

  if (criteria.industry === 'Any Industry' || franchise.industry === criteria.industry) {
    score += 40;
  }

  if (franchise.region && franchise.region.includes(criteria.region)) {
    score += 30;
    if (criteria.region === 'Ontario') score += 5;
  } else if (franchise.region && franchise.region.includes('Canada-Wide')) {
    score += 25;
  }

  const investmentRanges = {
    '$5k - $25k': { min: 5000, max: 25000 },
    '$25k - $100k': { min: 25000, max: 100000 },
    '$100k+': { min: 100000, max: 10000000 }
  };

  const range = investmentRanges[criteria.investmentRange];
  if (range && franchise.investment_min >= range.min && franchise.investment_max <= range.max) {
    score += 20;
  }

  if (criteria.lifestyle && franchise.business_model) {
    score += 10;
  }

  return score;
}
