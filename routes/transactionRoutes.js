// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
// Correct import path based on the assumed directory structure
const transactionsController = require('../controllers/transactionController');
const piechartController = require('../controllers/piechartControllers');

router.get('/monthlyData', transactionsController.getTransactions);
router.get('/statistics', transactionsController.getStatistics);
router.get('/price-ranges', transactionsController.getPriceRanges);

// http://localhost:3000/api/piechart?selectedMonth=3
router.get('/piechart', piechartController.getCategoriesPieChart);

module.exports = router;
