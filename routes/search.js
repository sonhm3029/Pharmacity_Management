const express = require('express');
const router = express.Router();
const searchController = require('../middleware/controllers/SearchController');


router.get('/',searchController.show);

module.exports = router;