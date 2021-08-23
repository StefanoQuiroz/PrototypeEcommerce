const express = require("express");
const router = express();

const {findCategory} = require("../controllers/category.controllers");

router.get(`/category`, findCategory);

module.exports = router;