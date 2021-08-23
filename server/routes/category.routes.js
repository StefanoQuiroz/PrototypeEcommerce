const express = require("express");
const router = express();
const {authenticate, authenticateAdmin} = require('../config/jwt.config');

const {findCategory, createCategory} = require("../controllers/category.controllers");

router.get(`/category`, findCategory);
router.post(`/category/create`, authenticate, authenticateAdmin, createCategory);

module.exports = router;